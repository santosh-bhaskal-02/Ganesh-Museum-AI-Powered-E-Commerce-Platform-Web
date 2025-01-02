import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import {
  ShoppingBag as ShoppingBagIcon,
  LocalShipping as LocalShippingIcon,
  ReceiptLong as ReceiptLongIcon,
  CurrencyRupee as CurrencyRupeeIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import AlertBox from "../404ErrorPage/AlertBox";
import EmptyCart from "./EmptyCart";
import LoadingSpinner from "../404ErrorPage/LoadingSpinner";
import SignInErrorPage from "../404ErrorPage/SignInErrorPage";

const apiUrl = import.meta.env.VITE_BACK_END_URL;

function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [loadingQuantity, setLoadingQuantity] = useState(false);
  const [taxDeliveryCharge, setTaxDeliveryCharge] = useState({});

  const userId = Cookies.get("userId");
  const authToken = Cookies.get("authToken");

  if (!userId || !authToken) {
    console.error("User is not authenticated. Missing token or userId.");
    return <SignInErrorPage />;
  }

  useEffect(() => {
    async function fetchCart() {
      try {
        const [resCart, resCharges] = await Promise.all([
          await axios.get(`${apiUrl}/api/products/cart/${userId}`, {
            headers: { Authorization: `Bearer ${authToken}` },
          }),
          await axios.get(`${apiUrl}/api/charges/fetch`, {
            headers: { Authorization: `Bearer ${authToken}` },
          }),
        ]);

        if (resCart.status === 200 && resCharges.status === 200) {
          //console.log(resCharges.data);
          setCart(resCart.data);
          setTaxDeliveryCharge(resCharges.data);

          const initialQuantities = {};

          resCart.data.cartItems.forEach((item) => {
            initialQuantities[item._id] = item.quantity;
          });
          setQuantities(initialQuantities);
        }
      } catch (err) {
        console.error(err.resCart?.data || err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchCart();
  }, []);

  const maxQuantity = 5;

  const updateQuantity = async (id, action) => {
    setLoadingQuantity(true);
    try {
      let newQuantity = action === "increment" ? quantities[id] + 1 : quantities[id] - 1;

      if (newQuantity > maxQuantity) {
        setAlert({
          type: "error",
          title: "Oops!",
          message: `You can only order up to ${maxQuantity} items.`,
        });

        setLoadingQuantity(false);
        return;
      }
      if (newQuantity < 1) {
        setLoadingQuantity(false);
        return;
      }

      setQuantities((prev) => ({ ...prev, [id]: newQuantity }));

      setCart((prevCart) => {
        const updatedCartItems = prevCart.cartItems.map((item) =>
          item._id === id ? { ...item, quantity: newQuantity } : item
        );

        const newTotalPrice = updatedCartItems.reduce((acc, item) => {
          const price = item.product.price || 0;
          const quantity = item.quantity || 0;
          return acc + quantity * price;
        }, 0);

        return { ...prevCart, cartItems: updatedCartItems, totalPrice: newTotalPrice };
      });

      const response = await axios.put(
        `${apiUrl}/api/products/cart/update`,
        { userId, productId: id, action },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      console.log("Quantity update", response.data);
    } catch (error) {
      setAlert({
        type: "error",
        title: "Oops!",
        message: `Error updating quantity:", ${
          error.response?.data.message || error.message
        }`,
      });
      console.error("Error updating quantity:", error.response?.data || error.message);
    } finally {
      setLoadingQuantity(false);
    }
  };

  const removeItem = async (id) => {
    try {
      // Call the backend to remove the item
      await axios.delete(`${apiUrl}/api/products/cart/remove/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      // Update local cart state
      setCart((prevCart) => {
        const updatedCartItems = prevCart.cartItems.filter((item) => item._id !== id);

        const newTotalPrice = updatedCartItems.reduce((acc, item) => {
          const price = item.product.price || 0;
          const quantity = item.quantity || 0;
          return acc + quantity * price;
        }, 0);

        return { ...prevCart, cartItems: updatedCartItems, totalPrice: newTotalPrice };
      });
    } catch (error) {
      setAlert({
        type: "error",
        title: "Oops!",
        message: `Error removing item: ${error.response?.data.message || error.message}`,
      });
      console.error("Error removing item:", error.response?.data || error.message);
    }
  };

  //console.log("168", taxDeliveryCharge);
  let shippingCharge = 0.0;
  let taxCharge = 0.0;
  let subtotal = cart ? cart.totalPrice + shippingCharge + taxCharge : 0;

  //console.log("169", cart);
  if (cart) {
    shippingCharge = taxDeliveryCharge.deliveryCharge;
    taxCharge = (cart.totalPrice * taxDeliveryCharge.taxRate) / 100;
    subtotal = isNaN(cart.totalPrice) ? 0 : cart.totalPrice;
  }

  const calculateTotal = (subtotal) => subtotal + shippingCharge + taxCharge;

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!cart || !cart.cartItems || cart.cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-white py-10 px-4 md:px-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}>
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
            className={`flex items-center gap-2 text-sm font-medium text-gray-600 ${
              index === 0 ? "animate-pulse text-yellow-500" : "text-gray-600"
            }`}>
            <div
              className={`w-6 h-6 flex items-center justify-center rounded-full ${
                index === 0 ? "bg-yellow-400 text-black" : "bg-gray-300 text-white"
              }`}>
              {index + 1}
            </div>
            {step}
            {index < 2 && <div className="w-6 h-0.5 bg-gray-300 mx-2" />}
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 sm:p-6 md:p-8">
          {/* Cart Items */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Shopping Cart</h2>
            {cart.cartItems.map((item) => (
                <div
                    key={item._id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 mb-6 hover:bg-gray-50 transition duration-200 ease-in-out gap-4">

                  <div className="flex gap-4 items-start sm:items-center">
                    <img
                        src={item.product.thumbnail.image_url}
                        alt={item.product.title}
                        className="w-20 h-20 object-cover rounded-lg shadow-lg"
                    />
                    <div>
                      <h3 className="text-base font-semibold">{item.product.title}</h3>
                      <p className="text-sm text-gray-500">Price: ₹{item.product.price}</p>
                    </div>
                  </div>


                  <div className="flex flex-wrap items-center justify-between gap-4 sm:gap-6 mt-2 sm:mt-0">

                  <div className="flex items-center border rounded-md">
                    <button
                      disabled={loadingQuantity || quantities[item._id] <= 1}
                      className="px-3 py-1 text-gray-700"
                      onClick={() => updateQuantity(item._id, "decrement")}>
                      -
                    </button>

                    <span className="px-4 py-1">{quantities[item._id]}</span>
                    <button
                      disabled={loadingQuantity || quantities[item._id] >= maxQuantity}
                      className="px-3 py-1 text-gray-700"
                      onClick={() => updateQuantity(item._id, "increment")}>
                      +
                    </button>
                  </div>
                  <p className="text-gray-700 font-medium">₹ {item.product.price}</p>
                  <DeleteRoundedIcon
                    onClick={() => removeItem(item._id)}
                    className="ml-4 text-red-500 hover:text-red-700 cursor-pointer"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-gray-600">
                <span className="flex items-center gap-2">
                  <ShoppingBagIcon fontSize="small" /> Subtotal
                </span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="flex items-center gap-2">
                  <LocalShippingIcon fontSize="small" /> Shipping
                </span>
                <span>₹{parseFloat(shippingCharge).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span className="flex items-center gap-2">
                  <ReceiptLongIcon fontSize="small" /> Taxes
                </span>
                <span>₹{parseFloat(taxCharge).toFixed(2)}</span>
              </div>
              <div className="border-t pt-4 flex justify-between items-center text-lg sm:text-xl font-semibold text-gray-800">
                <span className="flex items-center gap-2">
                  <CurrencyRupeeIcon fontSize="small" /> Total
                </span>
                <span>₹{calculateTotal(cart.totalPrice).toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-3 w-full">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/address")}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-lg font-medium transition duration-300 bg-yellow-400 hover:bg-yellow-500 text-black shadow-lg">
                <CurrencyRupeeIcon fontSize="small" />
                Proceed to Checkout
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
}

export default Cart;
