import { createAuthClient } from "better-auth/react";

// Use default same-origin base URL to avoid cross-origin cookie issues in production
export const authClient = createAuthClient();