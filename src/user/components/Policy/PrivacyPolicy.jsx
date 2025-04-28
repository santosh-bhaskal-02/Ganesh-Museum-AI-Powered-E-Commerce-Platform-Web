import React from "react";
import {
  Lock,
  User,
  Mail,
  ShieldCheck,
  Globe,
  Cookie,
  CreditCard,
  Database,
  RefreshCcw,
  MessageCircle,
} from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-yellow-50 min-h-screen flex items-center justify-center px-4 py-10">
      <div className="max-w-4xl bg-white shadow-2xl rounded-2xl p-8 sm:p-12">
        <h1 className="text-4xl font-bold text-yellow-600 text-center mb-2 flex items-center justify-center gap-2">
          <ShieldCheck className="w-8 h-8 text-yellow-500" />
          Privacy Policy
        </h1>
        <p className="text-center text-sm text-gray-500 mb-6">
          <strong>Effective Date:</strong> {new Date().toLocaleDateString()}
        </p>

        <section className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <User className="w-5 h-5 text-yellow-500" />Information We Collect
          </h2>
          <ul className="list-disc pl-6 mt-2 text-gray-700">
            <li>Name, Email, Phone Number</li>
            <li>Payment Details (Processed securely via Razorpay)</li>
            <li>Browser, Device Info, IP Address, Cookies</li>
          </ul>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Globe className="w-5 h-5 text-yellow-500" />How We Use Your Information
          </h2>
          <ul className="list-disc pl-6 mt-2 text-gray-700">
            <li>Process bookings and payments</li>
            <li>Improve our website and services</li>
            <li>Send updates (you can opt-out anytime)</li>
          </ul>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-yellow-500" />Payment Security
          </h2>
          <p className="text-gray-700 mt-2">
            All payments are securely processed via <strong>Razorpay</strong>. We do not store any sensitive card or UPI info.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Cookie className="w-5 h-5 text-yellow-500" />Cookies and Tracking
          </h2>
          <ul className="list-disc pl-6 mt-2 text-gray-700">
            <li>Used to remember preferences and improve UX</li>
            <li>You can disable cookies anytime in your browser</li>
          </ul>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Database className="w-5 h-5 text-yellow-500" />Data Sharing
          </h2>
          <p className="text-gray-700 mt-2">
            We <strong>never</strong> sell or rent your data. Limited info is shared only with:
          </p>
          <ul className="list-disc pl-6 mt-2 text-gray-700">
            <li>Trusted services (e.g. Razorpay)</li>
            <li>Legal authorities (if required by law)</li>
          </ul>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Lock className="w-5 h-5 text-yellow-500" />Data Security
          </h2>
          <p className="text-gray-700 mt-2">
            We take reasonable precautions to protect your data, but no system is 100% secure.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <RefreshCcw className="w-5 h-5 text-yellow-500" />Your Rights
          </h2>
          <ul className="list-disc pl-6 mt-2 text-gray-700">
            <li>Request data updates or deletion</li>
            <li>Unsubscribe from communication</li>
            <li>Control cookie preferences</li>
          </ul>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <RefreshCcw className="w-5 h-5 text-yellow-500" />Policy Changes
          </h2>
          <p className="text-gray-700 mt-2">
            We may revise this policy at any time. Changes will be posted here.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-yellow-500" />Contact Us
          </h2>
          <p className="text-gray-700 mt-2">
            Email:{" "}
            <a
              href="mailto:santoshbhaskal2127@gmail.com"
              className="text-blue-600 hover:underline">
              santoshbhaskal2127@gmail.com
            </a>
          </p>
          <p className="text-gray-700">
            Website:{" "}
            <a
              href="https://ganesh-museum.onrender.com"
              className="text-blue-600 hover:underline">
              ganesh-museum.onrender.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
