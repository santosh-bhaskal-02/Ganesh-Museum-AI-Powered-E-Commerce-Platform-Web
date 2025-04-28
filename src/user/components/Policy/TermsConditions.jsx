import React from "react";
import {
  BookText,
  UserCheck,
  FileKey,
  ShieldCheck,
  UserPlus,
  Ban,
  AlertTriangle,
  Gavel,
  Mail,
  Info,
} from "lucide-react";

const TermsConditions = () => {
  return (
    <div className="bg-yellow-50 min-h-screen flex items-center justify-center px-4 py-10">
      <div className="max-w-5xl bg-white shadow-2xl rounded-2xl p-8 sm:p-12">
        <h1 className="text-4xl font-bold text-yellow-600 text-center mb-8 flex items-center justify-center gap-2">
          <BookText className="w-8 h-8 text-yellow-500" />
          Terms & Conditions
        </h1>

        {/* Section 1 */}
        <Section
          icon={<BookText className="w-5 h-5 text-yellow-500" />}
          title="1. Agreement"
          content="By accessing this webpage, you agree to be bound by these Terms and Conditions in a legally binding agreement between us and you."
        />

        {/* Section 2 */}
        <Section
          icon={<UserCheck className="w-5 h-5 text-yellow-500" />}
          title="2. Eligibility"
          content="You represent and warrant that you have the legal right and authority to agree to these Terms and perform your obligations hereunder."
        />

        {/* Section 3 */}
        <Section
          icon={<FileKey className="w-5 h-5 text-yellow-500" />}
          title="3. Definitions"
          content={
            <ul className="list-disc pl-6 text-gray-700">
              <li><strong>Payment Instrument:</strong> Includes credit/debit cards, UPI, IMPS, etc.</li>
              <li><strong>Platform:</strong> Refers to the website where transactions occur.</li>
              <li><strong>Transaction:</strong> Refers to the order or service request placed by you.</li>
            </ul>
          }
        />

        {/* Section 4 */}
        <Section
          icon={<ShieldCheck className="w-5 h-5 text-yellow-500" />}
          title="4. Merchant's Rights"
          content="We may collect, store, and share your information to deliver the services you have requested."
        />

        {/* Section 5 */}
        <Section
          icon={<UserPlus className="w-5 h-5 text-yellow-500" />}
          title="5. Your Responsibilities"
          content="You agree to provide accurate and up-to-date information, including payment details and personal information, to complete transactions."
        />

        {/* Section 6 */}
        <Section
          icon={<Ban className="w-5 h-5 text-yellow-500" />}
          title="6. Prohibited Actions"
          content={
            <ul className="list-disc pl-6 text-gray-700">
              <li>Unauthorized use of the platform.</li>
              <li>Attempting to hack, reverse-engineer, or disrupt services.</li>
              <li>Engaging in fraudulent or misleading activities.</li>
            </ul>
          }
        />

        {/* Section 7 */}
        <Section
          icon={<AlertTriangle className="w-5 h-5 text-yellow-500" />}
          title="7. Limitation of Liability"
          content="We are not responsible for damages, losses, or liabilities arising from your use of our platform, except as required by law."
        />

        {/* Section 8 */}
        <Section
          icon={<Gavel className="w-5 h-5 text-yellow-500" />}
          title="8. Governing Laws & Dispute Resolution"
          content="These Terms are governed by Indian law. Any disputes will be resolved through arbitration in Bengaluru, as per the Arbitration and Conciliation Act, 1996."
        />

        {/* Section 9 */}
        <Section
          icon={<Mail className="w-5 h-5 text-yellow-500" />}
          title="9. Grievance Redressal"
          content={
            <>
              For any complaints, please contact us via our support email at{" "}
              <a href="mailto:support@ganeshmuseum.com" className="text-blue-600 hover:underline">
                support@ganeshmuseum.com
              </a>
              .
            </>
          }
        />

        {/* Section 10 */}
        <Section
          icon={<Info className="w-5 h-5 text-yellow-500" />}
          title="10. Disclaimer"
          content="We do not guarantee that our platform will be free from bugs, viruses, or errors. Users are advised to use appropriate security measures."
        />

        <p className="text-center text-gray-500 text-sm mt-10">
          Last Updated: <strong>February 2025</strong>
        </p>
      </div>
    </div>
  );
};

const Section = ({ icon, title, content }) => (
  <section className="mb-6">
    <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800 mb-2">
      {icon} {title}
    </h2>
    <div className="text-gray-700">{content}</div>
  </section>
);

export default TermsConditions;
