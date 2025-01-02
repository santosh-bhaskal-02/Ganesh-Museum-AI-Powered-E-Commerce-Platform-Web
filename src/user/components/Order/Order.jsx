import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  ShoppingBag as ShoppingBagIcon,
  LocalShipping as LocalShippingIcon,
  ReceiptLong as ReceiptLongIcon,
  CurrencyRupee as CurrencyRupeeIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import LoadingSpinner from "../404ErrorPage/LoadingSpinner";
import SignInErrorPage from "../404ErrorPage/SignInErrorPage";

import NoOrder from "./NoOrder";

const apiUrl = import.meta.env.VITE_BACK_END_URL;

function Order() {
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = Cookies.get("userId");
  const authToken = Cookies.get("authToken");

  if (!userId || !authToken) {
    console.error("User is not authenticated. Missing token or userId.");
    return <SignInErrorPage />;
  }

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get(
          `${apiUrl}/api/products/orders/get/user_orders/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
            credentials: "include",
          }
        );

        console.log(response.data);
        if (response.status === 200) {
          setOrderDetails(response.data);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [userId, authToken]);

  return (
    <motion.div
      className="bg-gradient-to-br from-blue-50 via-white to-white py-10 px-4 md:px-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-pink-50 via-white to-blue-50 rounded-2xl overflow-hidden">
          <div className="space-y-8 p-8">
            <h2 className="text-3xl font-bold text-indigo-800 mb-8">Your Orders</h2>

            {orderDetails.length === 0 ? (
              <NoOrder />
            ) : (
              orderDetails.map((order) => (
                  <motion.div
                      key={order._id}
                      className="flex flex-row items-start gap-4 border-b border-gray-200 rounded-xl p-2 md:p-6 bg-white hover:shadow-sm transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}>
                    <Link
                        to={`/order-details/${order._id}`}
                        className="flex flex-row w-full gap-4 items-start">

                      {/* Product Image */}
                      <img
                          src={
                              order.orderItems[0].product?.thumbnail?.image_url ??
                              order.orderItems[0].customProduct?.thumbnail?.image_url
                          }
                          alt="Product"
                          className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                      />

                      {/* Product + Price Details */}
                      <div className="flex flex-col justify-between w-full">
                        {/* Product Info */}
                        <div className="flex flex-col gap-1">
                          <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
                            {order.orderItems[0].product?.title ?? "Custom Idol"}
                          </h3>

                          {order.deliveredAt && (
                              <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-2">
                                <LocalShippingIcon fontSize="small" className="text-blue-500" />
                                <span>
              Delivery Date:&nbsp;
                                  <span className="font-medium text-gray-800">
                {new Date(order.deliveredAt).toLocaleDateString()}
              </span>
            </span>
                              </p>
                          )}

                          <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-2">
                            <ReceiptLongIcon fontSize="small" className="text-yellow-600" />
                            <span>
            Status:&nbsp;
                              <span className="font-medium text-gray-800">
              {order.status}
            </span>
          </span>
                          </p>
                        </div>

                        {/* Price Info */}
                        <div className="flex flex-col items-start sm:items-end mt-2 sm:mt-0">
                          <p className="text-base sm:text-lg font-semibold text-green-600 flex items-center gap-1">
                            <CurrencyRupeeIcon fontSize="small" />
                            {order.orderItems[0]?.product?.price ?? order.totalPrice}
                          </p>
                          <p className="text-xs text-gray-400">
                            Order ID: {order._id.toUpperCase()}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>

              ))
            )}
          </div>
        </div>
      )}

      <div className="flex justify-center mt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => window.history.back()}
          className="flex items-center gap-2 py-2 px-4 sm:py-3 sm:px-6 text-sm sm:text-base
 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-base font-medium shadow-md transition-all duration-200">
          <ArrowBackIcon fontSize="small" />
          Go Back
        </motion.button>
      </div>
    </motion.div>
  );
}

export default Order;
