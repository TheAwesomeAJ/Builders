import { createAuthClient } from "better-auth/client";
import { genericOAuthClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL,
    plugins: [genericOAuthClient()],
});

export const {
    signIn,
    signOut,
    signUp,
    useSession,
} = authClient;