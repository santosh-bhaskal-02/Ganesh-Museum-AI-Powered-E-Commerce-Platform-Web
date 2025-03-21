import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import AlertBox from "../Error/AlertBox";
import LoadingSpinner from "../Error/LoadingSpinner";

const apiUrl = import.meta.env.VITE_BACK_END_URL;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!formData.email.trim()) nextErrors.email = "Email is required.";
    if (!formData.password.trim()) nextErrors.password = "Password is required.";
    if (formData.password.length < 6) nextErrors.password = "Password must be at least 6 characters.";
    if (formData.password !== formData.confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await axios.put(`${apiUrl}/api/users/signup/admin/resetPassword`, {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        setAlert({
          type: "success",
          title: "Password Updated",
          message: response.data.message || "Password updated successfully.",
        });
        navigate("/admin/login");
      }
    } catch (err) {
      setAlert({
        type: "error",
        title: "Reset Failed",
        message: err?.response?.data?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-white to-blue-300 flex justify-center items-center px-4">
      {loading && <LoadingSpinner />}
      {alert && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
          <AlertBox
            type={alert.type}
            title={alert.title}
            message={alert.message}
            onClick={() => setAlert(null)}
          />
        </div>
      )}

      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <div className="relative mt-1">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <Mail size={18} />
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@example.com"
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all`}
              />
            </div>
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <div className="relative mt-1">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <Lock size={18} />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="New password"
                className={`w-full pl-10 pr-10 py-3 rounded-lg border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all`}
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-400"
                onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <div className="relative mt-1">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                <Lock size={18} />
              </span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className={`w-full pl-10 pr-10 py-3 rounded-lg border ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                } bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all`}
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-400"
                onClick={() => setShowConfirmPassword((prev) => !prev)}>
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-50">
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          <Link to="/admin/login" className="text-blue-600 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
