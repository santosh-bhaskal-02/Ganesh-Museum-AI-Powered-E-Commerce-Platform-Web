import React, {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import ErrorPage from "../404ErrorPage/ErrorPage";
import SkeletonAddressCard from "./SkeletonAddressCard";
import {motion} from "framer-motion";
import SignInErrorPage from "../404ErrorPage/SignInErrorPage";
import AlertBox from "../404ErrorPage/AlertBox";

const apiUrl = import.meta.env.VITE_BACK_END_URL;

function CheckAddress() {
    const navigate = useNavigate();
    const {pid} = useParams();
    const [loading, setLoading] = useState(true);
    const [Alert, setAlert] = useState(null);
    const [addressDetails, setAddressDetails] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zip: "",
        country: "",
    });

    const userId = Cookies.get("userId");
    const authToken = Cookies.get("authToken");

    useEffect(() => {
        if (!userId || !authToken) {
            console.error("User is not authenticated. Missing token or userId.");
            return navigate(`/login`);
        }
    }, [navigate]);

    useEffect(() => {
        async function fetchAddress() {
            try {
                const response = await axios.post(
                    `${apiUrl}/api/users/signup/address/${userId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                        credentials: "include",
                    }
                );
                if (response.status === 200) {
                    //console.log(response.data.data)
                    if (Object.keys(response.data.data).length === 0) {
                        navigate(pid ? `/add_address/${pid}` : `/add_address`);
                    }
                    setAddressDetails(response.data.data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchAddress();
    }, []);

    const handleEdit = () => {
        navigate(pid ? `/add_address/${pid}` : `/add_address`);
    };

    const handleCancel = () => {
        navigate(`/idoldetails/${pid}`);
    };

    const handleContinue = () => {
        navigate(pid ? `/place_order/${pid}` : `/place_order_cart`);
    };

    return (
        <motion.div
            className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-white py-12 px-6"
            initial={{opacity: 0, y: 30}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.4}}>
            {loading ? (
                <SkeletonAddressCard/>
            ) : (
                <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="flex justify-between items-center bg-blue-100 px-8 py-5 border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-gray-800">Shipping Address</h2>
                        <button
                            onClick={handleEdit}
                            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition">
                            Edit
                        </button>
                    </div>

                    {/* Address Details */}
                    <div className="px-8 py-6 space-y-4 text-gray-700">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">Name</h3>
                            <p>
                                {addressDetails.firstName} {addressDetails.lastName}
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">Email</h3>
                            <p>{addressDetails.email}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">Phone</h3>
                            <p>{addressDetails.phone}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800">Address</h3>
                            <p>{addressDetails.address1}</p>
                            {addressDetails.address2 && <p>{addressDetails.address2}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">City</h3>
                                <p>{addressDetails.city}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">State</h3>
                                <p>{addressDetails.state}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">Postal Code</h3>
                                <p>{addressDetails.zip}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">Country</h3>
                                <p>{addressDetails.country}</p>
                            </div>
                        </div>
                    </div>

                    {/* Footer Buttons */}
                    <div className="flex justify-end gap-4 bg-gray-50 px-8 py-6 border-t border-gray-200">
                        <motion.button
                            whileHover={{scale: 1.02}}
                            onClick={handleCancel}
                            className="px-6 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-red-500 hover:text-white transition">
                            Cancel
                        </motion.button>
                        <motion.button
                            whileHover={{scale: 1.02}}
                            onClick={handleContinue}
                            disabled={loading}
                            className={`px-6 py-2 text-sm font-medium rounded-md transition ${
                                loading
                                    ? "bg-blue-300 text-gray-100 cursor-not-allowed"
                                    : "bg-blue-600 text-white hover:bg-blue-700"
                            }`}>
                            {loading ? "Loading..." : "Continue"}
                        </motion.button>
                    </div>
                </div>
            )}
        </motion.div>
    );
}

export default CheckAddress;
