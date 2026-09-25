export const contactEmail = "admin@midnimoathletics.com";
export const contactEmailHref = `mailto:${contactEmail}`;
export const programInquiryHref = `${contactEmailHref}?subject=${encodeURIComponent("Program inquiry — Midnimo Athletics")}`;

export function createEmailDraft(name: string, email: string, message: string) {
  const subject = encodeURIComponent(`Message from ${name}`);
  const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`);
  return `${contactEmailHref}?subject=${subject}&body=${body}`;
}
