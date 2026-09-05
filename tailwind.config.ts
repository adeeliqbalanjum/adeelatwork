import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--bg)",
        foreground: "var(--ink)",
        accent: "rgba(255,255,255,.74)",
        "accent-foreground": "#070707",
        destructive: "#070707",
        secondary: "#ffffff",
        primary: "var(--yellow)",
        "primary-foreground": "#070707",
        muted: "rgba(7,7,7,.05)",
        "muted-foreground": "rgba(7,7,7,.52)",
      },
    },
  },
  plugins: [],
};
export default config;
