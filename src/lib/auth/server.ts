import { createNeonAuth } from "@neondatabase/auth/next/server";

// Managed Better Auth (Neon). Users live in the neon_auth schema on the same
// database; sign-up is closed — accounts are created in the Neon Console.
export const auth = createNeonAuth({
  baseUrl: process.env.NEON_AUTH_BASE_URL!,
  cookies: {
    secret: process.env.NEON_AUTH_COOKIE_SECRET!,
  },
});
