"use client";

import { createAuthClient } from "@neondatabase/auth/next";

// Browser-side client; talks to Neon through our /api/auth route handler.
export const authClient = createAuthClient();
