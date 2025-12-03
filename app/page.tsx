import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          NextAuth.js + OAuth2
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Spring Authorization Server Integration
        </p>
        
        <Link
          href="/login"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}