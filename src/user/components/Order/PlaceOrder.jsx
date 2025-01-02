import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import AlertBox from "../404ErrorPage/AlertBox";
import SkeletonPlaceOrder from "./SkeletonPlaceOrder";
import LoadingSpinner from "../404ErrorPage/LoadingSpinner";
import {
  ShoppingBag as ShoppingBagIcon,
  LocalShipping as LocalShippingIcon,
  ReceiptLong as ReceiptLongIcon,
  CurrencyRupee as CurrencyRupeeIcon,
  Paid as PaidIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const apiUrl = import.meta.env.VITE_BACK_END_URL;
const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

const PlaceOrder = () => {
  const [alert, setAlert] = useState(null);
  const { pid } = useParams();
  const navigate = useNavigate();

  const [idol, setIdol] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [taxDeliveryCharge, setTaxDeliveryCharge] = useState({});

  const userId = Cookies.get("userId");
  const authToken = Cookies.get("authToken");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const [resProduct, resCharges] = await Promise.all([
          await axios.get(`${apiUrl}/api/products/${pid}`),
          await axios.get(`${apiUrl}/api/charges/fetch`, {
            headers: { Authorization: `Bearer ${authToken}` },
          }),
        ]);
        if (resProduct && resCharges) {
          const { id, title, thumbnail, price } = resProduct.data;

          setIdol({
            id,
            title,
            thumbnail: thumbnail.image_url,
            price,
          });
          setTaxDeliveryCharge(resCharges.data);
        }
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [pid]);

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

  let shippingCharge = 0.0;
  let taxCharge = 0.0;
  let subTotal = idol ? idol.price + shippingCharge + taxCharge : 0;

  const handleQuantityChange = (newQuantity) => {
    setQuantity(Number(newQuantity));
  };

  //console.log("169", cart);
  if (idol) {
    shippingCharge = taxDeliveryCharge.deliveryCharge;
    taxCharge = (idol.price * taxDeliveryCharge.taxRate) / 100;
    subTotal = isNaN(idol.price * quantity) ? 0 : idol.price * quantity;
  }

  const calculateTotal = subTotal + shippingCharge + taxCharge;

  const checkoutPayment = async (productId) => {
    setOrderLoading(true);

    try {
      const isRazorpayLoaded = await loadRazorpay();
      if (!isRazorpayLoaded) {
        setAlert({
          type: "error",
          title: "Oops!",
          message: "Failed to load Razorpay. Please try again.",
        });

        setOrderLoading(false);
        return;
      }

      const response = await axios.post(
        `${apiUrl}/api/products/orders/place_order`,
        {
          orderItem: [{ productId, quantity }],
          user: userId,
          taxCharge,
          shippingCharge,
          subTotal,
          totalPrice: calculateTotal,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          credentials: "include",
        }
      );

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
            await axios.post(`${apiUrl}/api/products/orders/verify_payment`, {
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
              response.data.user.address.firstName + response.data.user.address.lastName,
            email: response.data.user.email,
            contact: response.data.user.phone,
          },
          theme: { color: "#FBBF24" },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      }
    } catch (err) {
      console.error("Error placing order:", err.response);
      setAlert({
        type: "error",
        title: "Oops!",
        message: err.response.data.message || err.data || err,
      });
    } finally {
      setOrderLoading(false);
    }
  };

  if (error || !idol) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <SkeletonPlaceOrder />
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-white py-10 px-4 md:px-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}>
      {orderLoading && <LoadingSpinner />}
      {alert && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-[1000]">
          <AlertBox
            type={alert.type}
            title={alert.title}
            message={alert.message}
            onClick={() => setAlert(null)}
          />
        </div>
      )}

      {/* Step Progress Bar */}
      <div className="flex justify-center gap-4 mb-8">
        {["Cart", "Shipping", "Payment"].map((step, index) => (
          <div
            key={step}
            className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <div
              className={`w-6 h-6 flex items-center justify-center rounded-full ${
                index < 2 ? "bg-yellow-400 text-black" : "bg-gray-300 text-white"
              }`}>
              {index + 1}
            </div>
            {step}
            {index < 2 && <div className="w-6 h-0.5 bg-gray-300 mx-2" />}
          </div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Product Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Review Your Order</h2>
            <div className="flex gap-4 items-start">
              <img
                src={idol.thumbnail}
                alt={idol.title}
                className="w-32 h-32 object-cover rounded-xl shadow-md"
              />
              <div>
                <h3 className="text-xl font-semibold text-gray-700">{idol.title}</h3>
                <p className="text-gray-600">Price: ₹{idol.price}</p>
                <div className="mt-3">
                  <label className="text-sm font-medium text-gray-600">Quantity:</label>
                  <select
                    value={quantity}
                    onChange={(e) => handleQuantityChange(e.target.value)}
                    className="ml-2 px-3 py-1 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400">
                    {[1, 2, 3, 4, 5].map((qty) => (
                      <option key={qty} value={qty}>
                        {qty}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-gray-600">
                <span className="flex items-center gap-2">
                  <ShoppingBagIcon fontSize="small" /> Subtotal
                </span>
                <span>₹{subTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="flex items-center gap-2">
                  <LocalShippingIcon fontSize="small" /> Shipping
                </span>
                <span>₹{shippingCharge.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="flex items-center gap-2">
                  <ReceiptLongIcon fontSize="small" /> Taxes
                </span>
                <span>₹{taxCharge.toFixed(2)}</span>
              </div>
              <div className="border-t pt-4 flex justify-between text-xl font-semibold text-gray-800">
                <span className="flex items-center gap-2">
                  <CurrencyRupeeIcon fontSize="small" /> Total
                </span>
                <span>₹{calculateTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => checkoutPayment(idol.id)}
                disabled={orderLoading}
                className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-lg font-medium transition duration-300 ${
                  orderLoading
                    ? "bg-yellow-300 text-yellow-800 cursor-not-allowed"
                    : "bg-yellow-400 hover:bg-yellow-500 text-black shadow-lg"
                }`}>
                <PaidIcon fontSize="small" />
                {orderLoading ? "Placing Order..." : "Pay Now"}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => navigate(-1)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-base font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 transition">
                <ArrowBackIcon fontSize="small" />
                Go Back
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PlaceOrder;
