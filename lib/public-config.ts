/** Public, build-time configuration. Never put credentials in NEXT_PUBLIC_* values. */
function httpsUrl(value: string | undefined): string | undefined {
  if (!value?.trim()) return undefined;
  try {
    const url = new URL(value.trim());
    return url.protocol === "https:" && !url.username && !url.password
      ? url.href
      : undefined;
  } catch {
    return undefined;
  }
}

// Next.js requires direct property access to inline public environment variables.
export const publicConfig = {
  heroVideoUrl: httpsUrl(process.env.NEXT_PUBLIC_HERO_VIDEO_URL),
};
