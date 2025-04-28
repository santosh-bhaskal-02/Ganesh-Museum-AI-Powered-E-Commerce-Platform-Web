import React from "react";
import { Truck, CalendarClock, Mail } from "lucide-react";

const ShippingPolicy = () => {
  return (
    <div className="bg-yellow-50 min-h-screen py-10 px-4 flex justify-center">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md px-6 sm:px-10 py-8 space-y-6">
        <h1 className="text-3xl font-bold text-yellow-600 border-b pb-4">
          Shipping & Delivery Policy
        </h1>

        {/* Shipping Details */}
        <section>
          <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
            <Truck className="text-yellow-500" size={20} />
            Delivery Timelines
          </div>
          <p className="mt-2 text-gray-700">
            All idols are dispatched within 2–3 business days of confirmed booking.
            Delivery typically takes 5–7 days, depending on your location. Delivery
            timelines are estimates unless specifically confirmed in writing.
          </p>
        </section>

        {/* Shipping Charges */}
        <section>
          <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
            <CalendarClock className="text-yellow-500" size={20} />
            Shipping Charges
          </div>
          <p className="mt-2 text-gray-700">
            Shipping charges are calculated at checkout based on your location and order
            weight. These charges are collected via RazorPay as part of the total order
            amount.
          </p>
        </section>

        {/* Delivery Issues */}
        <section>
          <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
            <Mail className="text-yellow-500" size={20} />
            Delayed or Missing Deliveries
          </div>
          <p className="mt-2 text-gray-700">
            If your idol hasn't arrived within 7 days of the expected delivery date,
            please contact us immediately:
          </p>
          <a
            href="mailto:santoshbhaskal2127@gmail.com"
            className="mt-1 flex items-center text-yellow-600 font-medium hover:underline"
          >
            <Mail size={18} className="mr-1" />
            santoshbhaskal2127@gmail.com
          </a>
        </section>
      </div>
    </div>
  );
};

export default ShippingPolicy;
