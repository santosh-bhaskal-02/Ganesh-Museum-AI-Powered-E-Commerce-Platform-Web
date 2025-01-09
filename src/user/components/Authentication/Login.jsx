import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { AuthContext } from "../ContextApi/AuthContext";
import LoadingSpinner from "../404ErrorPage/LoadingSpinner";
import AlertBox from "../404ErrorPage/AlertBox";
import { Eye, EyeOff } from "lucide-react";

const apiUrl = import.meta.env.VITE_BACK_END_URL;

function Login() {
  const [Alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const navigate = useNavigate();
  const { setSignIn } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const dataInput = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    let emailError = "";
    let passwordError = "";

    const emailRegex = /\S+@\S+\.\S+/;

    if (!loginData.email || !emailRegex.test(loginData.email)) {
      emailError = "Please enter a valid email address.";
    }

    if (!loginData.password || loginData.password.length < 6) {
      passwordError = "Password must be at least 6 characters long.";
    }

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return false;
    }

    setErrors({ email: "", password: "" });
    return true;
  };

  const login = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setLoadingButton(true);

    try {
      const response = await axios.post(
        `${apiUrl}/api/users/login/authenticate`,
        loginData
      );

      //console.log(response.data);
      if (response) {
        const { token, userId, isAdmin } = response.data.user;
        setAlert({
          type: "success",
          title: "Successful!",
          message: response.data.message,
        });

        const cookieOptions = { secure: true, sameSite: "Strict" };

        if (isAdmin) {
          Cookies.set("adminAuthToken", token, cookieOptions);
          Cookies.set("adminId", userId, cookieOptions);
        } else {
          Cookies.set("authToken", token, cookieOptions);
          Cookies.set("userId", userId, cookieOptions);
        }

        const hasCookies = isAdmin
          ? Cookies.get("adminId") && Cookies.get("adminAuthToken")
          : Cookies.get("userId") && Cookies.get("authToken");

        if (!hasCookies) {
          setAlert({
            type: "error",
            title: "Oops!",
            message: "Something went wrong. Try again!",
          });
          return;
        }

        setSignIn(true);
        setTimeout(() => navigate(isAdmin ? "/admin/dashboard" : "/explore"), 1500);
      }
    } catch (err) {
      setAlert({
        type: "error",
        title: "Oops!",
        message: err.response.data.message || "Something went wrong. Try again!",
      });
      //console.log("err", err.response.data.message);
    } finally {
      setLoading(false);
      setLoadingButton(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 px-4">
      {loading && <LoadingSpinner />}
      {Alert && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
          <AlertBox
            type={Alert.type}
            title={Alert.title}
            message={Alert.message}
            onClick={() => setAlert(null)}
          />
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 w-full max-w-md animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>

        <form onSubmit={login} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              value={loginData.email}
              onChange={dataInput}
              required
              autoComplete="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 mt-1 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={loginData.password}
                onChange={dataInput}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full px-4 py-3 mt-1 rounded-lg border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
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

          <div className="text-right text-sm">
            <Link to="/forgot_password" className="text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loadingButton}
            className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50">
            {loadingButton && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
            {loadingButton ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
