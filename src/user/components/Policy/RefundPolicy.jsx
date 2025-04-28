import React from "react";
import {
  FileX,
  RefreshCcw,
  ShieldAlert,
  Mail,
  AlertCircle,
  FileText,
} from "lucide-react";

const RefundPolicy = () => {
  return (
    <div className="bg-yellow-50 min-h-screen flex items-center justify-center px-4 py-10">
      <div className="max-w-4xl bg-white shadow-2xl rounded-2xl p-8 sm:p-12">
        <h1 className="text-4xl font-bold text-yellow-600 text-center mb-4 flex items-center justify-center gap-2">
          <RefreshCcw className="w-8 h-8 text-yellow-500" />
          Refund & Cancellation Policy
        </h1>

        <section className="mt-6">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
            <FileText className="w-5 h-5 text-yellow-500" />
            Transaction Agreement
          </h2>
          <p className="text-gray-700 mt-2">
            Once a transaction is completed, it is considered a legally binding agreement
            to purchase the product or service. Cancellations are only allowed if
            explicitly mentioned on the platform.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
            <ShieldAlert className="w-5 h-5 text-yellow-500" />
            Cancellation Discretion
          </h2>
          <p className="text-gray-700 mt-2">
            Cancellations are subject to our approval. We may request additional details
            before making a decision.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
            <FileX className="w-5 h-5 text-yellow-500" />
            Refund Eligibility
          </h2>
          <p className="text-gray-700 mt-2">
            Refunds are only possible if the product/service received does not match the
            description provided on the platform.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
            <AlertCircle className="w-5 h-5 text-yellow-500" />
            Refund Request Timeline
          </h2>
          <p className="text-gray-700 mt-2">
            A refund request must be submitted within 3 days of the transaction. The user
            must raise a ticket or contact us with detailed reasons and any necessary
            proof.
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
            <Mail className="w-5 h-5 text-yellow-500" />
            Contact for Refund
          </h2>
          <p className="text-gray-700 mt-2">
            Email:{" "}
            <a
              href="mailto:santoshbhaskal2127@gmail.com"
              className="text-blue-600 hover:underline">
              santoshbhaskal2127@gmail.com
            </a>
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-800">
            <RefreshCcw className="w-5 h-5 text-yellow-500" />
            Final Review
          </h2>
          <p className="text-gray-700 mt-2">
            Refund decisions are solely at our discretion. We may request additional
            information before processing your claim.
          </p>
        </section>
      </div>
    </div>
  );
};

export default RefundPolicy;
