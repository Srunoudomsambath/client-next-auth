// auth.ts - Fixed with correct client authentication
import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    {
      id: "spring-oauth",
      name: "Spring Authorization Server",
      type: "oidc",
      clientId: process.env.AUTH_CLIENT_ID!,
      clientSecret: process.env.AUTH_CLIENT_SECRET!,
      issuer: process.env.AUTH_ISSUER!,
      authorization: {
        params: {
          scope: "openid",
        },
      },
      token: {
        url: "http://localhost:9000/oauth2/token",
        // Force client credentials in body (not header)
        async request(context) {
          const body = new URLSearchParams({
            grant_type: "authorization_code",
            code: context.params.code!,
            redirect_uri: "http://localhost:3000",
            client_id: context.provider.clientId!,
            client_secret: context.provider.clientSecret!,
            code_verifier: context.checks.code_verifier!,
          });

          const response = await fetch(context.provider.token!.url!, {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: body.toString(),
          });

          const tokens = await response.json();
          
          if (!response.ok) {
            console.error("❌ Token exchange failed:", tokens);
            throw new Error(JSON.stringify(tokens));
          }

          console.log("✅ Token exchange success:", tokens);
          return { tokens };
        },
      },
      profile(profile) {
        console.log("✅ Profile from Spring /userinfo:", profile);
        return {
          id: profile.sub || profile.uuid,
          name: profile.name || profile.username,
          email: profile.email,
          image: profile.picture || null,
          roles: profile.roles || [],
        };
      },
    },
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        console.log("✅ JWT callback - Account:", account);
        return {
          ...token,
          accessToken: account.access_token,
          idToken: account.id_token,
          refreshToken: account.refresh_token,
          roles: (profile as any).roles || [],
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        accessToken: token.accessToken,
        user: {
          ...session.user,
          id: token.sub!,
          roles: token.roles || [],
        },
      } as any;
    },
  },
  debug: true,
});