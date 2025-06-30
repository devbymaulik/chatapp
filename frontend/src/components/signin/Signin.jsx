import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { signinUser } from "./redux/dispatcher";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { isLogin } = useSelector((state) => state.signinReducer);

  const onSubmit = (data) => {
    dispatch(signinUser(data));
  };

  useEffect(() => {
    if (isLogin) {
      navigate("/dashboard");
    }
  }, [isLogin, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3b82f6] to-[#6366f1] flex items-center justify-center px-4 py-6">
      <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row max-w-5xl w-full overflow-hidden">
        {/* Left Panel */}
        <div className="bg-blue-700 text-white md:w-1/2 w-full p-10 flex flex-col justify-center items-center space-y-6">
          <h1 className="text-4xl font-bold">Messenger</h1>
          <p className="text-center text-lg leading-relaxed">
            Chat seamlessly with friends and family. Fast, secure, and always
            connected.
          </p>
          <div className="transform hover:scale-105 transition-transform duration-300">
            <svg
              role="img"
              aria-label="Messenger Logo"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-32 h-32 drop-shadow-lg"
            >
              <path d="M2 3a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6l-4 4V3z" />
              <circle cx="8" cy="10" r="1.5" fill="#2563eb" />
              <circle cx="12" cy="10" r="1.5" fill="#2563eb" />
              <circle cx="16" cy="10" r="1.5" fill="#2563eb" />
            </svg>
          </div>
        </div>

        {/* Right Panel (Login Form) */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-2xl font-bold text-blue-600 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600 mb-6">Login to your Messenger account</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div className="relative">
              <input
                type="text"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Invalid email format",
                  },
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "At least 8 characters required",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
                    message:
                      "Must include uppercase, lowercase, number & symbol",
                  },
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {/* Show/Hide toggle */}
              <span
                className="absolute right-3 top-3 cursor-pointer text-sm text-gray-600 select-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="
    w-full 
    bg-blue-600 
    text-white 
    py-3 
    rounded-full 
    font-semibold 
    shadow-md 
    hover:bg-blue-700 
    hover:scale-105 
    transition 
    transform 
    duration-200 
    ease-in-out
    focus:outline-none 
    focus:ring-4 
    focus:ring-blue-300
    focus:ring-opacity-50
    active:scale-95
  "
            >
              Login
            </button>
          </form>

          {/* Switch to Sign Up */}
          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;
