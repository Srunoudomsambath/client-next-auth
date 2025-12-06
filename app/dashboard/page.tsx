"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition"
          >
            Sign Out
          </button>
        </div>

        {/* User Info Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Welcome, {session.user.name}! 👋
          </h2>

          <div className="space-y-4">
            {/* Email */}
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase">
                Email
              </p>
              <p className="text-lg text-gray-900 mt-1">{session.user.email}</p>
            </div>

            <hr />

            {/* User ID */}
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase">
                User ID
              </p>
              <p className="text-lg text-gray-900 mt-1 font-mono">
                {session.user.id}
              </p>
            </div>

            <hr />

            {/* Roles */}
            {session.user.roles && session.user.roles.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-gray-500 uppercase mb-2">
                  Roles
                </p>
                <div className="flex flex-wrap gap-2">
                  {session.user.roles.map((role: string, idx: number) => (
                    <span
                      key={idx}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* View Products Button */}
          <div className="mt-6">
            <button
              onClick={() => router.push("/product")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center gap-2"
            >
              View Products
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Access Token Info */}
        <div className="mt-6 bg-gray-900 rounded-xl p-6 text-white">
          <h3 className="font-semibold mb-2">Access Token Available</h3>
          <p className="text-sm text-gray-400">
            Token stored in session: {session.accessToken ? "✅" : "❌"}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Use session.accessToken for API calls
          </p>
        </div>
      </div>
    </div>
  );
}
