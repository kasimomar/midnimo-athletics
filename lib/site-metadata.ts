/** Server-side canonical origin. Configure SITE_URL for the public domain. */
export function siteOrigin(): URL {
  const configured = process.env.SITE_URL;
  if (configured) {
    const url = new URL(configured);
    if (url.protocol !== "https:" || url.username || url.password || url.pathname !== "/" || url.search || url.hash) {
      throw new Error("SITE_URL must be an HTTPS origin without credentials, a path, or query parameters.");
    }
    return url;
  }
  const deployment = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return new URL(deployment ? `https://${deployment}` : "http://localhost:3000");
}

export const siteTitle = "Midnimo Athletics | Youth Sports & Community";
export const siteDescription = "A nonprofit welcoming all youth through sports, movement, and community. Explore Midnimo Athletics programs and talk with our team about participating.";
