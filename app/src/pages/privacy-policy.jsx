import Head from "next/head";
import BaseLayout from "../components/BaseLayout";
import { envVars } from "../utils/envConfig";

const appName = envVars.REACT_APP_NAME;

const PrivacyPolicyPage = () => {
  return (
    <BaseLayout containerClass="flex flex-col items-center py-10 text-center">
      <Head>
        <title>Privacy Policy - {appName}</title>
      </Head>

      <div className="max-w-4xl w-full px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-8">
          Privacy Policy
        </h1>

        <div className="mt-2 text-base text-gray-700 dark:text-slate-300 leading-relaxed space-y-6 text-left"> {/* Changed text-lg to text-base */}
          <p><strong>Effective Date:</strong> January 1, 2025</p>

          <section className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-slate-200">1. Introduction</h2> {/* Responsive h2 */}
            <p>
              Welcome to <strong>{appName}</strong> (&ldquo;we,&rdquo; &ldquo;our,&rdquo; &ldquo;us&rdquo;). We are a marketplace connecting
              individuals seeking wedding services (&ldquo;Clients&rdquo;) with freelance wedding service providers
              (&ldquo;Freelancers&rdquo;). This Privacy Policy explains how we collect, use, disclose, and safeguard
              your information when you use our website and services.
            </p>
            <p>By using our platform, you agree to the collection and use of information in accordance with this policy.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-slate-200">2. Information We Collect</h2> {/* Responsive h2 */}

            <div>
              <h3 className="text-lg sm:text-xl font-medium text-gray-800 dark:text-slate-300">A. Information You Provide to Us</h3> {/* Responsive h3 */}
              <p>We collect information you provide directly to us when you use our services. This may include:</p>
              <ul className="list-disc list-inside pl-4 space-y-1"> {/* Added space-y-1 for list items */}
                <li>Account Information: name, email, password, phone, user type (Client/Freelancer)</li>
                <li>Profile Information: portfolio, services, experience, pricing</li>
                <li>Payment Info: transaction details (not full card info)</li>
                <li>Communications: messages and files exchanged</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium text-gray-800 dark:text-slate-300">B. Information We Collect Automatically</h3>
              <ul className="list-disc list-inside pl-4">
                <li>Log Info: IP, browser, OS, access times, pages</li>
                <li>Device Info: model, OS version, unique IDs</li>
                <li>Usage Info: features used, searches, interactions</li>
                <li>Cookies: for tracking and personalization</li>
              </ul>
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-slate-200">3. How We Use Your Information</h2> {/* Responsive h2 */}
            <ul className="list-disc list-inside pl-4 space-y-1"> {/* Added space-y-1 for list items */}
              <li>To provide and maintain services</li>
              <li>Facilitate logins and user connections</li>
              <li>Process bookings and payments</li>
              <li>Send notifications and updates</li>
              <li>Provide support and improve services</li>
              <li>Analyze trends and personalize experiences</li>
              <li>Protect users and comply with laws</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-slate-200">4. How We Share Your Information</h2> {/* Responsive h2 */}
            <ul className="list-disc list-inside pl-4 space-y-1"> {/* Added space-y-1 for list items */}
              <li>With other users (profile, listings, bookings)</li>
              <li>Third-party providers (payments, analytics)</li>
              <li>When required by law or safety concerns</li>
              <li>For mergers, sales, or business transfers</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-slate-200">5. Data Retention</h2> {/* Responsive h2 */}
            <p>
              We retain your data as long as your account is active or as needed for legal or operational reasons.
              Specific retention may vary depending on context.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-slate-200">6. Your Rights and Choices</h2> {/* Responsive h2 */}
            <ul className="list-disc list-inside pl-4 space-y-1"> {/* Added space-y-1 for list items */}
              <li>Review and update your account info</li>
              <li>Request deletion (with exceptions)</li>
              <li>Opt-out of promotional emails</li>
              <li>Manage cookies via browser settings</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-slate-200">7. Data Security</h2> {/* Responsive h2 */}
            <p>
              We implement reasonable security practices, but no system is 100% secure. Use the platform at your own discretion.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-slate-200">8. Children&rsquo;s Privacy</h2> {/* Responsive h2 */}
            <p>
              Our services are not intended for those under 18. If we learn a child under 18 provided info, we will delete it promptly.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-slate-200">9. International Data Transfers</h2> {/* Responsive h2 */}
            <p>
              Your data may be transferred outside your region. We ensure reasonable protection for cross-border data flows.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-slate-200">10. Changes to This Privacy Policy</h2> {/* Responsive h2 */}
            <p>
              We may update this policy. Changes will be posted here with an updated effective date. Please review periodically.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-slate-200">11. Contact Us</h2> {/* Responsive h2 */}
            <p>
              If you have questions, contact us at:
              <br />
              <strong>contact@{appName.toLowerCase().replace(/\s+/g, "")}.com</strong>
            </p>
          </section>
        </div>
      </div>
    </BaseLayout>
  );
};

export default PrivacyPolicyPage;
