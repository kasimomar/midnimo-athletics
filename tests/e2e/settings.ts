export const mode = process.env.E2E_MODE ?? "blank";
if (mode !== "blank" && mode !== "configured") {
  throw new Error("E2E_MODE must be blank or configured");
}

export const configured = mode === "configured";
export const baseURL = "http://localhost:3100";
export const integrationURLs = {
  hero: "https://media.example.test/hero.mp4",
  registration: "https://registration.example.test/submit",
  checkout: "https://checkout.example.test/pay",
};
