import { betterAuth } from "better-auth";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    vercel: {
      clientId: process.env.VERCEL_CLIENT_ID || "",
      clientSecret: process.env.VERCEL_CLIENT_SECRET || "",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
  secret: process.env.BETTER_AUTH_SECRET || "craft-dev-secret-replace-in-production",
});
