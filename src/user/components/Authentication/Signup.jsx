import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {
    Mail,
    User,
    Smartphone,
    Lock,
    Key,
    CheckCircle,
    Eye,
    EyeOff,
} from "lucide-react";
import AlertBox from "../404ErrorPage/AlertBox";
import LoadingSpinner from "../404ErrorPage/LoadingSpinner";

const apiUrl = import.meta.env.VITE_BACK_END_URL;

function Signup() {
    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [signUpData, setSignUpData] = useState({
        email: "",
        otp: "",
        firstName: "",
        lastName: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setSignUpData((prevData) => ({...prevData, [name]: value}));
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () =>
        setShowConfirmPassword(!showConfirmPassword);

    const validateEmail = (email) => {
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(email);
    };

    const sendOtp = async (event) => {
        event.preventDefault();
        if (!signUpData.email || !validateEmail(signUpData.email)) {
            setErrors({email: "Please enter a valid email."});
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(`${apiUrl}/api/users/signup/send_otp`, {
                email: signUpData.email,
            });
            if (response.status === 200) {
                setOtpSent(true);
                setAlert({
                    type: "success",
                    title: "OTP Sent Successfully!",
                    message: response.data.message,
                });
            }
        } catch (err) {
            setAlert({
                type: "error",
                title: "Oops!",
                message: err.response?.data.message || "Failed to send OTP.",
            });
        } finally {
            setLoading(false);
        }
    };

    const verifyOtp = async (event) => {
        event.preventDefault();
        if (!otp) {
            setErrors({otp: "Please enter OTP."});
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(`${apiUrl}/api/users/signup/verify_otp`, {
                email: signUpData.email,
                otp,
            });
            if (response.status === 200) {
                setStep(2);
                setAlert({
                    type: "success",
                    title: "OTP Verified!",
                    message: response.data.message,
                });
            }
        } catch (err) {
            setAlert({
                type: "error",
                title: "Invalid OTP!",
                message: err.response?.data.message || "Invalid OTP.",
            });
        } finally {
            setLoading(false);
        }
    };

    const nextStep = (event) => {
        event.preventDefault();
        setErrors({});
        let newErrors = {};

        if (step === 2) {
            if (!signUpData.firstName.trim()) newErrors.firstName = "First name is required.";
            if (!signUpData.lastName.trim()) newErrors.lastName = "Last name is required.";
        } else if (step === 3) {
            if (!signUpData.phone || !/^[0-9]{10}$/.test(signUpData.phone)) {
                newErrors.phone = "Enter a valid 10-digit phone number.";
            }
        } else if (step === 4) {
            if (!signUpData.password || signUpData.password.length < 6) {
                newErrors.password = "Password must be at least 6 characters.";
            }
            if (signUpData.password !== signUpData.confirmPassword) {
                newErrors.confirmPassword = "Passwords do not match.";
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const signup = async (event) => {
        event.preventDefault();
        setErrors({});
        let newErrors = {};

        if (!signUpData.password || signUpData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
        }
        if (signUpData.password !== signUpData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(`${apiUrl}/api/users/signup`, signUpData);
            if (response.status === 201) {
                setAlert({
                    type: "success",
                    title: "Sign Up Successful!",
                    message: response.data.message,
                });

                navigate("/login");
            }
        } catch (err) {
            setAlert({
                type: "error",
                title: "Sign Up Failed!",
                message: err.response?.data.message || "Signup failed.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
            {loading && <LoadingSpinner/>}
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
            <div className="w-full max-w-lg p-8 bg-white shadow-xl rounded-lg transition-all duration-300">
                {/* Title */}
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
                    <CheckCircle className="inline-block text-blue-600" size={40}/> Sign Up
                </h2>

                {/* Description */}
                <p className="text-center text-lg text-gray-600 mb-8">
                    Create an account to enjoy exclusive access to our platform. Let's get started!
                </p>

                <div className="flex justify-between items-center mb-4">
                    <div className="flex space-x-2">
                        {[1, 2, 3, 4].map((stepNum) => (
                            <div
                                key={stepNum}
                                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                                    step >= stepNum ? "bg-blue-600" : "bg-gray-400"
                                }`}></div>
                        ))}
                    </div>
                    <span className="text-sm text-gray-500">{step} / 4</span>
                </div>

                <form
                    className="space-y-6"
                    onSubmit={
                        step === 1 ? (otpSent ? verifyOtp : sendOtp) : step === 4 ? signup : nextStep
                    }>
                    {/* Step 1: Email & OTP */}
                    {step === 1 && (
                        <>
                            <div className="relative">
                                <Mail
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600"
                                    size={20}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                    value={signUpData.email}
                                    onChange={handleChange}
                                    className="w-full pl-12 p-4 bg-gray-50 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300"
                                />
                            </div>
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-2">{errors.email}</p>
                            )}

                            {otpSent && (
                                <div className="relative mt-4">
                                    <Key
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600"
                                        size={20}
                                    />
                                    <input
                                        type="text"
                                        name="otp"
                                        placeholder="Enter OTP"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="w-full pl-12 p-4 bg-gray-50 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300"
                                    />
                                </div>
                            )}
                        </>
                    )}

                    {/* Step 2: Name */}
                    {step === 2 &&
                        ["firstName", "lastName"].map((field) => (
                            <div key={field} className="relative">
                                <User
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600"
                                    size={20}
                                />
                                <input
                                    type="text"
                                    name={field}
                                    placeholder={field === "firstName" ? "First Name" : "Last Name"}
                                    value={signUpData[field]}
                                    onChange={handleChange}
                                    className="w-full pl-12 p-4 bg-gray-50 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300"
                                />

                            </div>


                        ))}
                    {errors.firstName && <p className="text-red-500 text-sm mt-2">{errors.firstName}</p>}
                    {errors.lastName && <p className="text-red-500 text-sm mt-2">{errors.lastName}</p>}
                    {/* Step 3: Mobile */}
                    {step === 3 && (
                        <>
                            <div className="relative">

                                <Smartphone
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600"
                                    size={20}
                                />
                                <input
                                    type="text"
                                    name="phone"
                                    placeholder="Mobile Number"
                                    value={signUpData.phone}
                                    onChange={handleChange}
                                    className="w-full pl-12 p-4 bg-gray-50 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300"
                                />


                            </div>
                            {errors.phone && <p className="text-red-500 text-sm mt-2">{errors.phone}</p>}
                        </>
                    )}

                    {/* Step 4: Password */}
                    {step === 4 &&
                        ["password", "confirmPassword"].map((field, index) => (
                            <>
                                <div key={field} className="relative">
                                    <Lock
                                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600"
                                        size={20}
                                    />
                                    <input
                                        type={
                                            index === 0
                                                ? showPassword
                                                    ? "text"
                                                    : "password"
                                                : showConfirmPassword
                                                    ? "text"
                                                    : "password"
                                        }
                                        name={field}
                                        placeholder={field === "password" ? "Password" : "Confirm Password"}
                                        value={signUpData[field]}
                                        onChange={handleChange}
                                        className="w-full pl-12 p-4 bg-gray-50 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all duration-300"
                                    />

                                    <div
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                        onClick={
                                            index === 0
                                                ? togglePasswordVisibility
                                                : toggleConfirmPasswordVisibility
                                        }>
                                        {index === 0 ? (
                                            showPassword ? (
                                                <EyeOff size={20}/>
                                            ) : (
                                                <Eye size={20}/>
                                            )
                                        ) : showConfirmPassword ? (
                                            <EyeOff size={20}/>
                                        ) : (
                                            <Eye size={20}/>
                                        )}
                                    </div>

                                </div>

                            </>
                        ))}{errors.confirmPassword &&
                    <p className="text-red-500 text-sm mt-2">{errors.confirmPassword}</p>}
                    {errors.password &&
                        <p className="text-red-500 text-sm mt-2">{errors.password}</p>}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                        {loading
                            ? step === 1
                                ? "Sending OTP..."
                                : "Processing..."
                            : step === 4
                                ? "Sign Up"
                                : "Next"}
                    </button>

                    {step > 1 && (
                        <button
                            type="button"
                            onClick={prevStep}
                            className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2.5 rounded-xl transition">
                            Back
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Signup;
