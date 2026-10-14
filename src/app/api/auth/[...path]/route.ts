import { auth } from "@/lib/auth/server";

// Proxies Neon Auth (sign-in, sign-out, session refresh) through our domain.
export const { GET, POST } = auth.handler();
