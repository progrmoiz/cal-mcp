export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            <strong>Last updated:</strong> {new Date().toLocaleDateString()}
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Overview</h2>
          <p className="text-gray-700 mb-4">
            CalMCP (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) provides a Google Calendar integration service for AI assistants. 
            This Privacy Policy explains how we collect, use, and protect your information when you use our service.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Information We Collect</h2>
          <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">Google Account Information</h3>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Email address (for account identification)</li>
            <li>Google Calendar data (calendars, events, availability)</li>
            <li>OAuth tokens (for secure API access)</li>
          </ul>

          <h3 className="text-xl font-medium text-gray-800 mt-6 mb-3">Usage Information</h3>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>API requests and responses</li>
            <li>Session data for authentication</li>
            <li>Error logs for service improvement</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">How We Use Your Information</h2>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li><strong>Calendar Operations:</strong> Read, create, update, and delete calendar events through AI commands</li>
            <li><strong>Authentication:</strong> Verify your identity and maintain secure sessions</li>
            <li><strong>Service Delivery:</strong> Provide MCP server functionality to your AI assistant</li>
            <li><strong>Troubleshooting:</strong> Debug issues and improve service reliability</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Data Storage and Security</h2>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>OAuth tokens are securely encrypted and stored</li>
            <li>Session data is temporary and automatically expires</li>
            <li>We use industry-standard security practices</li>
            <li>Calendar data is accessed in real-time and not permanently stored</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Data Sharing</h2>
          <p className="text-gray-700 mb-4">
            We do not sell, trade, or share your personal information with third parties, except:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>With Google&apos;s APIs as necessary to provide calendar functionality</li>
            <li>When required by law or to protect our rights</li>
            <li>With your explicit consent</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Your Rights</h2>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li><strong>Access:</strong> View what data we have about you</li>
            <li><strong>Deletion:</strong> Request deletion of your account and data</li>
            <li><strong>Revocation:</strong> Revoke Google OAuth access at any time</li>
            <li><strong>Portability:</strong> Export your data in machine-readable format</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Google OAuth Compliance</h2>
          <p className="text-gray-700 mb-4">
            Our use of Google APIs adheres to Google&apos;s API Services User Data Policy, including the Limited Use requirements. 
            We only use Google user data to provide and improve our calendar integration features.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Data Retention</h2>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>OAuth tokens: Until revoked or expired</li>
            <li>Session data: 30 days maximum</li>
            <li>Error logs: 90 days maximum</li>
            <li>Account data: Until account deletion requested</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Children&apos;s Privacy</h2>
          <p className="text-gray-700 mb-4">
            Our service is not intended for children under 13. We do not knowingly collect personal information from children under 13.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Changes to This Policy</h2>
          <p className="text-gray-700 mb-4">
            We may update this Privacy Policy periodically. Changes will be posted on this page with an updated date.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-4">
            If you have questions about this Privacy Policy or want to exercise your rights, contact us through:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>GitHub Issues: <a href="https://github.com/progrmoiz/cal-mcp/issues" className="text-blue-600 hover:underline">https://github.com/progrmoiz/cal-mcp/issues</a></li>
            <li>GitHub Discussions: <a href="https://github.com/progrmoiz/cal-mcp/discussions" className="text-blue-600 hover:underline">https://github.com/progrmoiz/cal-mcp/discussions</a></li>
          </ul>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              This privacy policy is designed to comply with GDPR, CCPA, and Google&apos;s API requirements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}