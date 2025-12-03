"use client";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const handleLogin = () => {
    signIn("spring-oauth", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-md w-full">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome
        </h1>
        <p className="text-gray-600 mb-8">
          Sign in with Spring Authorization Server
        </p>
        
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
        >
          Sign In with OAuth2
        </button>

        <p className="text-xs text-gray-500 mt-6 text-center">
          Using NextAuth.js with PKCE
        </p>
      </div>
    </div>
  );
}