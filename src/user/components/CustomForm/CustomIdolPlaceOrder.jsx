import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import LoadingSpinner from "../404ErrorPage/LoadingSpinner";
import {
  UserIcon,
  MailIcon,
  PhoneIcon,
  CalendarIcon,
  ClipboardListIcon,
  TextQuoteIcon,
  RulerIcon,
  InfoIcon,
  CheckCircle,
  XCircle,
  Eye,
} from "lucide-react";
import { motion } from "framer-motion";
import DialogBox from "../404ErrorPage/Dialog";
import AlertBox from "../404ErrorPage/AlertBox";
import {
  BadgeCheck,
  Clock,
  Info,
  Loader,
  Image as ImageIcon,
  IndianRupee,
} from "lucide-react";

const apiUrl = import.meta.env.VITE_BACK_END_URL;
const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

const steps = [
  "Accepted",
  "Awaiting for Payment",
  "Payment Successful",
  "Shipped",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

const StatusProgressBar = ({ currentStatus }) => {
  const currentIndex = steps.indexOf(currentStatus);

  return (
    <div className="flex items-center justify-between gap-2 mt-8 overflow-x-auto">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center gap-1">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              index <= currentIndex
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-gray-600"
            }`}>
            {index + 1}
          </div>
          <span className="text-xs">{step}</span>
          {index < steps.length - 1 && (
            <div
              className={`w-8 h-1 ${
                index < currentIndex ? "bg-blue-600" : "bg-gray-300"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

const CustomIdolPlaceOrder = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const authToken = Cookies.get("authToken");

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const fetchFormDetails = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/custom-idol/fetch-list/${formId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setForm(response.data.result);
      console.log(response.data.result);
    } catch (err) {
      console.error("Error fetching form:", err);
      setAlert({
        type: "error",
        title: "Oops!",
        message: "Failed to load form data.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFormDetails();
  }, [formId]);

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setPaymentProcessing(true);
    setLoading(true);
    try {
      const isRazorpayLoaded = await loadRazorpay();
      if (!isRazorpayLoaded) {
        setAlert({
          type: "error",
          title: "Oops!",
          message: "Failed to load Razorpay. Please try again.",
        });

        setPaymentProcessing(false);
        return;
      }

      const response = await axios.post(
        `${apiUrl}/api/custom-idol/place_order`,
        {
          orderItem: [{ productId: form.id, quantity: 0 }],
          user: form.user.id,
          taxCharge: 0.0,
          shippingCharge: 0.0,
          subTotal: 1000.0,
          totalPrice: 1000.0,
        },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      const order = response.data.order;

      console.log("143", response.data.order);

      if (response.status === 200) {
        const orderId = response.data.order.id;
        const options = {
          key: razorpayKey,
          amount: response.data.razorpayOrder.amount,
          currency: "INR",
          name: "Idol Booking",
          description: "Complete your purchase",
          order_id: response.data.razorpayOrder.id,

          handler: async function (response) {
            await axios.post(`${apiUrl}/api/custom-idol/verify_payment`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: orderId,
            });

            setAlert({
              type: "success",
              title: "Successful!",
              message: "Payment Successful! Order placed.",
            });

            navigate("/orders");
          },

          prefill: {
            name:
              response.data.order.user.address.firstName +
              response.data.order.user.address.lastName,
            email: response.data.order.user.email,
            contact: response.data.order.user.phone,
          },
          theme: { color: "#FBBF24" },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      }
    } catch (err) {
      console.error("Error placing order:", err);
      // setAlert({
      //   type: "error",
      //   title: "Oops!",
      //   message: err.response.data.message || err.data || err,
      // });
    } finally {
      setPaymentProcessing(false);
      setLoading(false);
    }
  };

  //if (loading) return <LoadingSpinner />;
  if (!form)
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500">
        Form not found.
      </div>
    );

  return (
    <motion.div className="min-h-screen py-10 px-4 md:px-6 bg-gradient-to-br from-yellow-50 to-white">
      {loading && <LoadingSpinner />}
      {alert && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-[1000]">
          <AlertBox
            type={alert.type}
            title={alert.title}
            message={alert.message}
            onClick={() => setAlert(null)}
          />
        </div>
      )}

      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-yellow-100">
        <div className="grid md:grid-cols-2 gap-10 p-8">
          {/* LEFT: Idol Suggestion Details */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Info className="w-6 h-6 text-yellow-500" />
              Your Custom Idol Suggestion
            </h2>

            <div className="flex gap-5 items-start flex-wrap">
              {form.thumbnail?.image_url ? (
                <img
                  src={form.thumbnail.image_url}
                  alt="Custom Idol"
                  className="w-32 h-32 object-cover rounded-xl border shadow-md"
                />
              ) : (
                <div className="w-32 h-32 flex items-center justify-center bg-gray-100 text-gray-400 rounded-xl border">
                  <ImageIcon className="w-8 h-8" />
                </div>
              )}

              <div className="space-y-2 text-sm text-gray-700">
                <p className="font-medium flex items-center gap-2">
                  <Info className="w-4 h-4 text-yellow-600" />
                  <span>
                    <span className="text-yellow-600 font-semibold">Suggestion:</span>{" "}
                    {form.suggestion}
                  </span>
                </p>

                <p className="flex items-center gap-2 text-gray-600">
                  <BadgeCheck className="w-4 h-4 text-green-600" />
                  <span>
                    <span className="font-medium">Height:</span> {form.size}
                  </span>
                </p>

                <p className="flex items-center gap-2 text-gray-600">
                  <Info className="w-4 h-4 text-blue-500" />
                  <span>
                    <span className="font-medium">Specifications:</span>{" "}
                    {form.otherSpecifications}
                  </span>
                </p>

                <p className="flex items-center gap-2 text-gray-700 font-medium">
                  <Clock className="w-4 h-4 text-purple-500" />
                  Status:
                  <span
                    className={`ml-2 px-3 py-1 rounded-full text-white text-xs font-semibold ${
                      form.status === "Pending"
                        ? "bg-yellow-500"
                        : form.status === "Accepted"
                        ? "bg-green-500"
                        : form.status === "Awaiting for Payment"
                        ? "bg-blue-500"
                        : "bg-red-500"
                    }`}>
                    {form.status}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Payment Summary */}
          <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-200 shadow-inner flex flex-col justify-between">
            <div className="space-y-4 text-gray-700">
              <h3 className="text-xl font-semibold text-yellow-700 flex items-center gap-2">
                <IndianRupee className="w-5 h-5" />
                Payment Details
              </h3>

              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Subtotal</span>
                <span>₹1000</span>
              </div>

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>₹1000</span>
              </div>
            </div>

            {form.status === "Awaiting for Payment" && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                disabled={paymentProcessing}
                onClick={handlePayment}
                className="mt-6 w-full flex items-center justify-center gap-2 px-5 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-xl shadow-lg transition">
                {paymentProcessing ? (
                  <>
                    <Loader className="animate-spin w-4 h-4" />
                    Processing...
                  </>
                ) : (
                  <>
                    <IndianRupee className="w-5 h-5" />
                    Make Payment
                  </>
                )}
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CustomIdolPlaceOrder;
