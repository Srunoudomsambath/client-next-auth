// auth.ts
import NextAuth, { type DefaultSession } from "next-auth";
import { TokenRequestContext, SpringUserInfo } from "./types/next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    {
  id: "spring-oauth",
  name: "Spring Authorization Server",
  type: "oidc",

  clientId: process.env.AUTH_CLIENT_ID!,
  clientSecret: undefined,   // PKCE client has no secret
  issuer: process.env.AUTH_ISSUER!,

  client: { 
    token_endpoint_auth_method: "none",   // ⭐ IMPORTANT FIX
  },

  authorization: {
    params: { scope: "openid profile email" },
  },

  token: {
    url: "http://localhost:9000/oauth2/token",

    async request(context: TokenRequestContext) {
      const body = new URLSearchParams({
        grant_type: "authorization_code",
        code: context.params.code!,
        redirect_uri: "http://localhost:3000/api/auth/callback/spring-oauth",
        client_id: context.provider.clientId!,
        code_verifier: context.checks.code_verifier!,
      });

      const res = await fetch(context.provider.token!.url!, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });

      const tokens = await res.json();

      if (!res.ok) {
        console.error("❌ Token exchange failed:", tokens);
        throw new Error(JSON.stringify(tokens));
      }

      console.log("✅ Token exchange success:", tokens);
      return { tokens };
    },
  },

  profile(profile: SpringUserInfo) {
    return {
      id: profile.sub,
      name: profile.name,
      email: profile.email,
      image: profile.picture ?? null,
      roles: profile.roles ?? [],
    };
  },
},

  ],

  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const springUser = profile as SpringUserInfo;

        return {
          ...token,
          accessToken: account.access_token,
          idToken: account.id_token,
          refreshToken: account.refresh_token,
          roles: springUser.roles ?? [],
        };
      }

      return token;
    },

    async session({ session, token }) {
      return {
        ...session,
        accessToken: token.accessToken as string | undefined,
        user: {
          ...session.user,
          id: token.sub as string,
          roles: (token.roles as string[]) ?? [],
        },
      };
    },
  },

  debug: true,
});
