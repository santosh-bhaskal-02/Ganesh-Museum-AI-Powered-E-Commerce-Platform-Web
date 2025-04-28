import React, {useState} from "react";
import {FaMapMarkerAlt, FaEnvelope, FaPhoneAlt} from "react-icons/fa";
import Cookies from "js-cookie";
import AlertBox from "../404ErrorPage/AlertBox";

const apiUrl = import.meta.env.VITE_BACK_END_URL;

const ContactUs = () => {
    const [Alert, setAlert] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const userId = Cookies.get("userId");
    const authToken = Cookies.get("authToken");


    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const {name, email, subject, message} = formData;

        const mailtoLink = `mailto:santoshbhaskal2127@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\n${message}`
        )}`;

        window.location.href = mailtoLink;

        setAlert({
            type: "success",
            title: "Success!",
            message: "Your email has been prepared. Please send it via your email client.",
        });

        setFormData({
            name: "",
            email: "",
            subject: "",
            message: ""
        });
    };


    return (
        <div className="bg-yellow-50 py-16 min-h-screen flex items-center justify-center">
            <div className="max-w-6xl w-full bg-white shadow-2xl rounded-lg p-8 flex flex-col md:flex-row gap-12">
                {/* Left Section - Contact Information */}
                {Alert && (
                    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-[1000]">
                        <AlertBox
                            type={Alert.type}
                            title={Alert.title}
                            message={Alert.message}
                            onClick={() => setAlert(null)}
                        />
                    </div>
                )}
                <div className="w-full md:w-1/2 space-y-8">
                    <h1 className="text-4xl font-extrabold text-indigo-900 text-center md:text-left mb-4">
                        Contact Us
                    </h1>
                    <p className="text-lg text-gray-700 text-center md:text-left">
                        We’d love to hear from you! Whether you have a question, need help, or want to
                        give feedback, feel free to get in touch.
                    </p>

                    <div className="space-y-4 text-gray-800">
                        <p className="flex items-center gap-3 font-medium">
                            <FaMapMarkerAlt className="text-red-600 text-2xl"/>
                            Gadhinglaj, Maharashtra, India
                        </p>

                        <p className="flex items-center gap-3 font-medium">
                            <FaEnvelope className="text-blue-500 text-2xl"/>
                            santoshbhaskal2127@gmail.com
                        </p>

                        <p className="flex items-center gap-3 font-medium">
                            <FaPhoneAlt className="text-green-600 text-2xl"/>
                            +91-8805419693
                        </p>
                    </div>

                    {/* Google Map Embed */}
                    <div className="mt-8">
                        <iframe
                            className="w-full h-64 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.181579681119!2d74.34453427524233!3d16.228718584636008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc0f5dd25b65d0f%3A0x8f5e4d309e680eb3!2sGadhinglaj%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1707450678752"
                            allowFullScreen
                            loading="lazy"
                            title="Gadhinglaj Location"></iframe>
                    </div>
                </div>

                {/* Right Section - Form */}
                <div className="w-full md:w-1/2">
                    <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 space-y-6">
                        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
                            Get in Touch
                        </h2>

                        {/* Name Field */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                                Your Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                placeholder="Enter your name"
                            />
                        </div>

                        {/* Email Field */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                placeholder="Enter your email"
                            />
                        </div>

                        {/* subject Field */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="subject">
                                Subject
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                placeholder="Enter your Subject"
                            />
                        </div>

                        {/* Message Field */}
                        <div>
                            <label className="block text-gray-700 font-medium mb-2" htmlFor="message">
                                Message
                            </label>
                            <textarea
                                id="message"
                                rows="6"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                placeholder="Write your message here..."></textarea>
                        </div>

                        {/* Submit Button */}
                        <div className="text-center">
                            <button
                                type="submit"

                                className="bg-indigo-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out transform hover:scale-105">
                                Send Message
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
