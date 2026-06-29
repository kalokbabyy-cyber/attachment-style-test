export function getBaseUrl(requestOrigin?: string | null) {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }

  if (requestOrigin) {
    return requestOrigin.replace(/\/$/, "");
  }

  return "http://localhost:3000";
}
