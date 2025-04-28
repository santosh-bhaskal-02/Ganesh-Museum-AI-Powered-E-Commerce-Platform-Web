import React from "react";
import {
  CreditCard,
  ShieldCheck,
  HelpCircle,
  RefreshCcw,
  Mail,
} from "lucide-react";

const PaymentsPolicy = () => {
  return (
    <div className="bg-yellow-50 min-h-screen py-10 px-4 flex justify-center">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md px-6 sm:px-10 py-8 space-y-6">
        <h1 className="text-3xl font-bold text-yellow-600 border-b pb-4">
          Payments Policy
        </h1>

        {/* Payment Methods */}
        <section>
          <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
            <CreditCard className="text-yellow-500" size={20} />
            How do I pay for an idol booking?
          </div>
          <p className="mt-2 text-gray-700">
            We use <span className="font-semibold text-yellow-600">RazorPay</span> as our secure payment gateway. You can pay using:
          </p>
          <ul className="list-disc pl-5 text-gray-700 mt-2 space-y-1">
            <li>Credit/Debit Cards (Visa, MasterCard, Rupay, etc.)</li>
            <li>UPI (Google Pay, PhonePe, Paytm, etc.)</li>
            <li>Net Banking</li>
            <li>Wallets & EMI (if available on RazorPay)</li>
          </ul>
        </section>

        {/* Hidden Charges */}
        <section>
          <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
            <ShieldCheck className="text-yellow-500" size={20} />
            Are there any hidden charges?
          </div>
          <p className="mt-2 text-gray-700">
            No, there are no hidden charges. The price on the product page is the final amount. Delivery charges (if any) are shown during checkout.
          </p>
        </section>

        {/* Payment Safety */}
        <section>
          <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
            <ShieldCheck className="text-yellow-500" size={20} />
            Is it safe to pay through RazorPay?
          </div>
          <p className="mt-2 text-gray-700">
            Absolutely! RazorPay uses <span className="font-semibold">256-bit encryption</span> to keep your payment data safe and secure.
          </p>
        </section>

        {/* Support */}
        <section>
          <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
            <HelpCircle className="text-yellow-500" size={20} />
            How do I contact support for payment issues?
          </div>
          <p className="mt-2 text-gray-700">
            If you experience issues with your payment, contact us at:
          </p>
          <a
            href="mailto:santoshbhaskal2127@gmail.com"
            className="mt-1 flex items-center text-yellow-600 font-medium hover:underline"
          >
            <Mail size={18} className="mr-1" />
            santoshbhaskal2127@gmail.com
          </a>
        </section>

        {/* Refund Policy */}
        <section>
          <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
            <RefreshCcw className="text-yellow-500" size={20} />
            Refund & Cancellation
          </div>
          <p className="mt-2 text-gray-700">
            Refunds and cancellations follow our{" "}
            <a
              href="/refund-policy"
              className="text-yellow-600 font-semibold hover:underline"
            >
              Refund Policy
            </a>
            . Please review it before placing an order.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PaymentsPolicy;
