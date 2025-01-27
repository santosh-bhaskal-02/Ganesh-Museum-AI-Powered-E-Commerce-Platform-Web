import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Key, Eye, EyeOff } from "lucide-react";
import AlertBox from "../404ErrorPage/AlertBox";
import LoadingSpinner from "../404ErrorPage/LoadingSpinner";

const apiUrl = import.meta.env.VITE_BACK_END_URL;

function ForgotPassword() {
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [signUpData, setSignUpData] = useState({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignUpData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validate = () => {
    let newErrors = {};
    if (step === 1 && !signUpData.email.match(/\S+@\S+\.\S+/)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (step === 2 && !signUpData.otp) {
      newErrors.otp = "OTP is required.";
    }
    if (step === 3) {
      if (!signUpData.password || signUpData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters.";
      }
      if (signUpData.password !== signUpData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match.";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      switch (step) {
        case 1:
          const res1 = await axios.post(`${apiUrl}/api/users/login/send_otp`, {
            email: signUpData.email,
          });
          setAlert({ type: "success", title: "Success", message: res1.data.message });
          setStep(2);
          break;
        case 2:
          const res2 = await axios.post(`${apiUrl}/api/users/login/verify_otp`, {
            email: signUpData.email,
            otp: signUpData.otp,
          });
          setAlert({ type: "success", title: "Success", message: res2.data.message });
          setStep(3);
          break;
        case 3:
          const res3 = await axios.put(`${apiUrl}/api/users/login/resetPassword`, {
            email: signUpData.email,
            password: signUpData.password,
          });
          setAlert({
            type: "success",
            title: "Password Updated",
            message: res3.data.message,
          });
          navigate("/login");
          break;
        default:
          break;
      }
    } catch (err) {
      setAlert({
        type: "error",
        title: "Oops!",
        message: err.response?.data?.message || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-50 via-white to-blue-100 px-4">
      {alert && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <AlertBox
            type={alert.type}
            title={alert.title}
            message={alert.message}
            onClick={() => setAlert(null)}
          />
        </div>
      )}

      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-blue-200 animate-fade-in">
        {loading && <LoadingSpinner />}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 tracking-tight">
          {step === 1 && "Forgot Password"}
          {step === 2 && "Verify OTP"}
          {step === 3 && "Reset Password"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400"
                  size={20}
                />
                <input
                  type="email"
                  name="email"
                  value={signUpData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full pl-12 py-3 rounded-xl bg-blue-50 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email}</p>
              )}
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="relative">
                <Key
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400"
                  size={20}
                />
                <input
                  type="text"
                  name="otp"
                  value={signUpData.otp}
                  onChange={handleChange}
                  placeholder="Enter OTP"
                  className="w-full pl-12 py-3 rounded-xl bg-blue-50 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              {errors.otp && <p className="text-sm text-red-500 mt-1">{errors.otp}</p>}
            </div>
          )}

          {step === 3 && (
            <>
              <div>
                <div className="relative">
                  <Lock
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400"
                    size={20}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={signUpData.password}
                    onChange={handleChange}
                    placeholder="New Password"
                    className="w-full pl-12 py-3 rounded-xl bg-blue-50 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <div
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <EyeOff size={20} className="text-blue-400" />
                    ) : (
                      <Eye size={20} className="text-blue-400" />
                    )}
                  </div>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">{errors.password}</p>
                )}
              </div>

              <div>
                <div className="relative">
                  <Lock
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400"
                    size={20}
                  />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={signUpData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    className="w-full pl-12 py-3 rounded-xl bg-blue-50 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <div
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? (
                      <EyeOff size={20} className="text-blue-400" />
                    ) : (
                      <Eye size={20} className="text-blue-400" />
                    )}
                  </div>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            </>
          )}

          <div className="flex flex-col items-center gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                step > 1 ? "w-full" : ""
              } bg-blue-400 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl shadow-md transition-all duration-300`}>
              {loading ? "Processing..." : step === 3 ? "Update" : "Next"}
            </button>
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2.5 rounded-xl transition">
                Back
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
