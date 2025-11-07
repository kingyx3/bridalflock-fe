import Head from "next/head";
import BaseLayout from "../components/BaseLayout";
import { envVars } from "../utils/envConfig";

const appName = envVars.REACT_APP_NAME;

const TermsOfServicePage = () => {
  return (
    <BaseLayout containerClass="flex flex-col items-center py-10 text-center">
      <Head>
        <title>Terms of Service - {appName}</title>
      </Head>

      <div className="max-w-4xl w-full px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-8">Terms of Service</h1>

        <div className="mt-2 text-base text-gray-700 dark:text-slate-300 leading-relaxed space-y-6 text-left"> {/* Changed text-lg to text-base */}
          <p><strong>Effective Date:</strong> January 1, 2024</p>
          <p>Please read these Terms of Service (&ldquo;Terms&rdquo;, &ldquo;Terms of Service&rdquo;) carefully before using the {appName} website (the &ldquo;Service&rdquo;) operated by {appName} (&ldquo;us&rdquo;, &ldquo;we&rdquo;, or &ldquo;our&rdquo;).</p>
          <p>Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service. By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Service.</p>

          <section className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-slate-200">1. Our Services</h2> {/* Responsive h2 */}
            <p>{appName} provides an online marketplace that connects individuals seeking wedding-related services (&ldquo;Clients&rdquo;) with independent freelance service providers (&ldquo;Freelancers&rdquo;). We are a platform provider; Freelancers are independent contractors and not employees or agents of {appName}. We do not provide the freelance services ourselves.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-slate-200">2. User Accounts</h2> {/* Responsive h2 */}
            <p>To use certain features of our Service, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for safeguarding your password and for any activities or actions under your account. We reserve the right to suspend or terminate your account if any information provided is found to be inaccurate, not current, or incomplete.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-slate-200">3. Roles and Responsibilities</h2> {/* Responsive h2 */}

            <div>
              <h3 className="text-lg sm:text-xl font-medium text-gray-800 dark:text-slate-300">A. Freelancers</h3> {/* Responsive h3 */}
              <p>Freelancers agree to accurately represent their services, skills, and pricing. They are responsible for the quality and delivery of services booked through the platform and for communicating professionally with Clients.</p>
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-medium text-gray-800 dark:text-slate-300">B. Clients</h3> {/* Responsive h3 */}
              <p>Clients agree to provide accurate details about their service needs and to make timely payments for services booked. They are responsible for clear communication with Freelancers.</p>
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-slate-200">4. Service Listings, Bookings, and Cancellations</h2> {/* Responsive h2 */}
            <p>Freelancers create listings for their services. Clients can book these services based on availability and terms specified by the Freelancer. Cancellation and refund policies will be clearly stated in each service listing or as mutually agreed between Client and Freelancer, subject to platform guidelines.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-slate-200">5. Payments and Fees</h2> {/* Responsive h2 */}
            <p>Clients will pay for services through our secure payment gateway. {appName} may charge a service fee to Clients and/or Freelancers for use of the platform, which will be clearly disclosed. Payouts to Freelancers will be processed according to our payment schedule, after deduction of applicable fees.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-slate-200">6. User Content and Intellectual Property</h2> {/* Responsive h2 */}
            <p>Users retain ownership of the content they upload (text, photos, videos). However, by posting content on {appName}, you grant us a worldwide, non-exclusive, royalty-free license to use, display, and distribute your content in connection with operating and promoting the Service. All intellectual property rights in the Service itself (excluding user content) are owned by or licensed to {appName}.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-slate-200">7. Code of Conduct</h2> {/* Responsive h2 */}
            <p>All users agree to use the Service responsibly and ethically. Prohibited activities include harassment, discrimination, fraud, spamming, circumventing our fee structure, or posting illegal or inappropriate content. Violation of this Code of Conduct may result in account suspension or termination.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-slate-200">8. Reviews and Feedback</h2> {/* Responsive h2 */}
            <p>We encourage honest and respectful reviews. Reviews should reflect genuine experiences. We reserve the right to moderate or remove reviews that violate our policies.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-slate-200">9. Dispute Resolution</h2> {/* Responsive h2 */}
            <p>We encourage users to resolve disputes directly. {appName} may offer a dispute resolution process to help mediate disagreements between Clients and Freelancers, but we are not obligated to do so and do not take legal responsibility for such disputes.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-slate-200">10. Disclaimers and Limitation of Liability</h2> {/* Responsive h2 */}
            <p>The Service is provided &ldquo;as is&rdquo; without any warranties, express or implied. {appName} does not guarantee the quality, safety, or legality of services provided by Freelancers. We are not liable for any direct, indirect, incidental, or consequential damages arising from your use of the Service or interactions between users, beyond a specified limit (e.g., the amount of platform fees paid by you).</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-slate-200">11. Indemnification</h2> {/* Responsive h2 */}
            <p>You agree to indemnify and hold harmless {appName}, its directors, officers, employees, and agents from and against any claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys&rsquo; fees) arising out of or relating to your use of the Service, your violation of these Terms, or your violation of any rights of a third party.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-slate-200">12. Modifications to Terms</h2> {/* Responsive h2 */}
            <p>We reserve the right to modify these Terms at any time. We will provide notice of material changes by posting the new Terms on this page and updating the &ldquo;Effective Date.&rdquo; Your continued use of the Service after such changes constitutes your acceptance of the new Terms.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-slate-200">13. Termination</h2> {/* Responsive h2 */}
            <p>We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-slate-200">14. Governing Law</h2> {/* Responsive h2 */}
            <p>These Terms shall be governed and construed in accordance with the laws of our operating jurisdiction, without regard to its conflict of law provisions.</p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-slate-200">15. Contact Us</h2> {/* Responsive h2 */}
            <p>If you have any questions about these Terms, please contact us at: <strong>contact@{appName.toLowerCase().replace(/\s+/g, "")}.com</strong></p>
          </section>
        </div>
      </div>
    </BaseLayout>
  );
};

export default TermsOfServicePage;
