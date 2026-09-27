import { createHash } from "node:crypto";
import { inquiryPrograms, inquiryLimits } from "./inquiry.ts";

export type InquiryMail = {
  from: string; to: string; replyTo: string; subject: string; text: string;
};
type Dependencies = {
  enabled: boolean;
  domain: string | undefined;
  recipient: string;
  checkBot: () => Promise<{ isBot: boolean }>;
  send: (mail: InquiryMail, key: string) => Promise<{ data: { id: string } | null; error: unknown }>;
};
const reply = (status: number, message: string) => Response.json({ message }, {
  status, headers: { "Cache-Control": "no-store" },
});

// Bound the actual stream, not just Content-Length, which callers can omit.
async function readBody(request: Request): Promise<unknown> {
  const reader = request.body?.getReader();
  if (!reader) throw new Error("Missing body");
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 16000) throw new Error("Body too large");
      chunks.push(value);
    }
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } finally {
    await reader.cancel();
    reader.releaseLock();
  }
}

export async function handleInquiry(request: Request, deps: Dependencies) {
  if (!deps.enabled || !deps.domain || !/^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,}$/i.test(deps.domain)) {
    return reply(503, "Online sending is unavailable. Please email our team directly.");
  }
  if (request.headers.get("origin") !== new URL(request.url).origin) {
    return reply(403, "Please send your inquiry from this website.");
  }
  if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") {
    return reply(415, "Please use the inquiry form.");
  }
  let body: unknown;
  try { body = await readBody(request); }
  catch { return reply(400, "Please check your message and try again."); }
  if (!body || typeof body !== "object" || Array.isArray(body)) return reply(400, "Please check the form fields.");
  const fields = body as Record<string, unknown>;
  const { name, email, program, message, website, requestId } = fields;
  if (typeof name !== "string" || !name.trim() || name.length > inquiryLimits.name || /[\r\n\x00]/.test(name)
    || typeof email !== "string" || email.length > inquiryLimits.email || !/^[^\s@<>(),;:\[\]\\"]+@[^\s@<>(),;:\[\]\\"]+\.[^\s@<>(),;:\[\]\\"]+$/.test(email)
    || typeof program !== "string" || !(inquiryPrograms as readonly string[]).includes(program)
    || typeof message !== "string" || message.length > inquiryLimits.message || message.includes("\0")
    || typeof website !== "string" || website !== ""
    || typeof requestId !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(requestId)) {
    return reply(400, "Please check your name, email, program, and message.");
  }
  try {
    if ((await deps.checkBot()).isBot) return reply(403, "We could not verify this request. Please email our team directly.");
    // Fixed recipient and plain text prevent open-relay use and HTML injection.
    const mail: InquiryMail = {
      from: `Midnimo Athletics Website <inquiries@${deps.domain}>`,
      to: deps.recipient,
      replyTo: email,
      subject: `Program inquiry: ${program}`,
      text: `Website inquiry (not confirmed enrollment)\n\nName: ${name.trim()}\nReply email: ${email}\nProgram: ${program}\n\n${message.trim() || "No additional question provided."}`,
    };
    const digest = createHash("sha256").update(JSON.stringify(mail)).digest("hex");
    const result = await deps.send(mail, `inquiry/${requestId}/${digest}`);
    if (result.error || !result.data?.id) return reply(502, "We could not confirm sending. Try again or email our team directly.");
    return reply(200, "Your inquiry has been submitted to our team. This does not reserve a place in a program.");
  } catch {
    // Never log contact details, provider responses, or credentials.
    return reply(503, "We could not confirm sending. Try again or email our team directly.");
  }
}
