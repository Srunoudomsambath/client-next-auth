// app/test-config/page.tsx
// Create this page to test your configuration
export default function TestConfigPage() {
  const config = {
    AUTH_SECRET: process.env.AUTH_SECRET ? "✅ Set" : "❌ Missing",
    AUTH_CLIENT_ID: process.env.AUTH_CLIENT_ID || "❌ Missing",
    AUTH_CLIENT_SECRET: process.env.AUTH_CLIENT_SECRET ? "✅ Set" : "❌ Missing",
    AUTH_URL: process.env.AUTH_URL || "❌ Missing",
    AUTH_ISSUER: process.env.AUTH_ISSUER || "❌ Missing",
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || "Not set (optional)",
    NODE_ENV: process.env.NODE_ENV,
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6">Configuration Test</h1>
        
        <div className="space-y-3">
          {Object.entries(config).map(([key, value]) => (
            <div key={key} className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="font-mono text-sm">{key}</span>
              <span className={`font-semibold ${value.includes('❌') ? 'text-red-600' : 'text-green-600'}`}>
                {value}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded">
          <h2 className="font-semibold mb-2">Next Steps:</h2>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>All environment variables should show ✅</li>
            <li>If any show ❌, add them to .env.local</li>
            <li>Restart your dev server after changes</li>
            <li>Test: <a href="http://localhost:9000/.well-known/openid-configuration" target="_blank" className="text-blue-600 underline">Spring OIDC Discovery</a></li>
          </ol>
        </div>
      </div>
    </div>
  );
}