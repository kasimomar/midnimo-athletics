import { checkBotId } from "botid/server";
import { Resend } from "resend";
import { contactEmail } from "@/lib/contact";
import { handleInquiry } from "@/lib/inquiry-handler";
import { inquirySendingEnabled } from "@/lib/inquiry-config";

export const runtime = "nodejs";
export const maxDuration = 30;

export async function POST(request: Request) {
  return handleInquiry(request, {
    enabled: inquirySendingEnabled(),
    domain: process.env.RESEND_EMAIL_DOMAIN,
    recipient: process.env.VERCEL_ENV === "preview" ? "delivered@resend.dev" : contactEmail,
    checkBot: () => checkBotId({ advancedOptions: { checkLevel: "basic" } }),
    send: (mail, idempotencyKey) => new Resend(process.env.RESEND_API_KEY).emails.send(mail, { idempotencyKey }),
  });
}
