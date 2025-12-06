import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      roles?: string[];
      username?: string;
    } & DefaultSession["user"];

  }

  interface User {
    roles?: string[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    idToken?: string;
    roles?: string[];
  }
}
type TokenRequestContext = {
  params: {
    code?: string;
  };
  provider: {
    clientId?: string;
    clientSecret?: string;
    token?: {
      url?: string;
    };
  };
  checks: {
    code_verifier?: string;
  };
};


// User info from Spring Authorization Server
export interface SpringUserInfo {
  sub: string; // This is the uuid
  email: string;
  name: string;
  family_name?: string;
  given_name?: string;
  username?: string;
  uuid?: string;
  roles?: string[];
  picture?: string;
}