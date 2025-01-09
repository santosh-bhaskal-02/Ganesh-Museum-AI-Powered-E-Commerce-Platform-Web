import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function ErrorPage() {
  const navigate = useNavigate();
  return (
    <main className="grid min-h-screen place-items-center bg-gradient-to-tr from-indigo-100 via-white to-purple-100 px-6 py-24 sm:py-32">
      <div className="text-center bg-white/70 backdrop-blur-lg border border-white/40 shadow-2xl rounded-2xl p-10 max-w-xl w-full">
        <motion.div>
          <p className="text-lg font-bold text-indigo-600 animate-pulse">404</p>

          <h1 className="mt-4 text-4xl sm:text-6xl font-extrabold text-gray-900 leading-tight">
            Oops! Page Not Found
          </h1>

          <p className="mt-6 text-base sm:text-lg text-gray-600">
            Sorry, we couldn't find the page you're looking for. It might have been moved
            or deleted.
          </p>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/explore")}
            className="mt-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-indigo-300 transition-all duration-300">
            Browse Products
          </motion.button>
        </motion.div>
      </div>
    </main>
  );
}

export default ErrorPage;
