import React from "react";
import { Link } from "react-router-dom";
import { FaPaintBrush, FaHandHoldingHeart, FaShippingFast } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div className="bg-yellow-50 py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-extrabold text-center text-indigo-900 mb-10">
          About Us
        </h1>
        
        <div className="bg-white p-10 rounded-xl shadow-xl space-y-8">
          <p className="text-lg text-gray-800 text-justify leading-relaxed">
            Welcome to <span className="font-bold text-indigo-600">Ganesh Museum</span>, your one-stop destination for exquisite Ganesh idols crafted with devotion and artistry. We believe that Lord Ganesha, the harbinger of good fortune and remover of obstacles, deserves a special place in your home and heart.
          </p>
          <p className="text-lg text-gray-800 text-justify leading-relaxed">
            Our collection features a diverse range of Ganesh idols made from eco-friendly materials, intricately designed to cater to all preferences, whether you seek traditional sculptures or contemporary designs. Each idol is a masterpiece, symbolizing faith, positivity, and cultural heritage.
          </p>
          <p className="text-lg text-gray-800 text-justify leading-relaxed">
            At <span className="font-bold text-indigo-600">Ganesh Museum</span>, customer satisfaction is our priority. We ensure quality craftsmanship, secure packaging, and timely delivery to make your shopping experience seamless and joyful. Whether it’s for Ganesh Chaturthi, home decor, or gifting, we are here to make your celebrations truly divine.
          </p>
        </div>

        <div className="mt-16 text-center space-y-10">
          <div className="flex justify-center space-x-16">
            <div className="flex items-center space-x-4 p-6 rounded-xl shadow-xl transition-transform transform hover:scale-105 bg-indigo-50 hover:bg-indigo-100">
              <FaPaintBrush className="text-indigo-600 text-4xl transition-transform transform hover:scale-110" />
              <div>
                <h3 className="text-xl font-semibold text-indigo-900">Artistry</h3>
                <p className="text-gray-700">Exquisite craftsmanship and attention to detail in every idol.</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-6 rounded-xl shadow-xl transition-transform transform hover:scale-105 bg-indigo-50 hover:bg-indigo-100">
              <FaHandHoldingHeart className="text-indigo-600 text-4xl transition-transform transform hover:scale-110" />
              <div>
                <h3 className="text-xl font-semibold text-indigo-900">Customer Care</h3>
                <p className="text-gray-700">Our priority is to offer you a seamless and joyful shopping experience.</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-6 rounded-xl shadow-xl transition-transform transform hover:scale-105 bg-indigo-50 hover:bg-indigo-100">
              <FaShippingFast className="text-indigo-600 text-4xl transition-transform transform hover:scale-110" />
              <div>
                <h3 className="text-xl font-semibold text-indigo-900">Timely Delivery</h3>
                <p className="text-gray-700">We ensure timely and secure delivery for a hassle-free experience.</p>
              </div>
            </div>
          </div>

          <p className="text-lg text-gray-800 mt-6 max-w-xl mx-auto">
            Thank you for choosing us as a part of your spiritual journey. Let's celebrate faith and artistry together!
          </p>

          <div className="mt-12">
            <Link
              to="/contact_us"
              className="inline-block bg-indigo-600 text-white font-medium py-3 px-10 rounded-xl shadow-lg transform hover:scale-110 transition duration-300 ease-in-out hover:bg-indigo-700 hover:shadow-2xl"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
