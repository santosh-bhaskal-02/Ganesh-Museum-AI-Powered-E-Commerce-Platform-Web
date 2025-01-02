import React from "react";
import { useNavigate } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { motion } from "framer-motion";

const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="backdrop-blur-md bg-white/70 border border-white/40 shadow-2xl rounded-3xl p-10 text-center max-w-md w-full"
      >
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ShoppingCartOutlinedIcon
            className="text-indigo-500 drop-shadow-lg"
            style={{ fontSize: "100px" }}
          />
        </motion.div>

        <h2 className="text-3xl font-extrabold text-gray-800 mt-6">Cart is Feeling Lonely</h2>
        <p className="text-gray-600 mt-2">
          You haven't added anything yet. Let’s fill it up with something amazing!
        </p>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/explore")}
          className="mt-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-indigo-300 transition-all duration-300"
        >
          Browse Products
        </motion.button>
      </motion.div>
    </div>
  );
};

export default EmptyCart;
