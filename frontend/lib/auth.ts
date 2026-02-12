import { betterAuth } from "better-auth";
import { genericOAuth } from "better-auth/plugins";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: false,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  plugins: [
    genericOAuth({
      config: [
        {
          providerId: "hackclub",
          clientId: process.env.HACKCLUB_OAUTH_CLIENT_ID as string,
          clientSecret: process.env.HACKCLUB_OAUTH_CLIENT_SECRET as string,
          redirectURI: `${process.env.BETTER_AUTH_URL as string}/api/auth/oauth2/callback/hackclub`,
          discoveryUrl:
            "https://auth.hackclub.com/.well-known/openid-configuration",
        },
      ],
    }),
  ],
});