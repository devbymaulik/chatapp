import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import registerUser from "./redux/dispatcher";
import { Link } from "react-router-dom";

function Signup() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");
  const onSubmit = (data) => {
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
      confirmpassword: data.confirmpassword,
    };
    dispatch(registerUser(userData));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3b82f6] to-[#6366f1] flex items-center justify-center px-4 py-6">
      <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row max-w-5xl w-full overflow-hidden">
        {/* Left Panel */}
        <div className="bg-blue-700 text-white md:w-1/2 w-full p-10 flex flex-col justify-center items-center space-y-6">
          <h1 className="text-4xl font-bold">Messenger</h1>
          <p className="text-center text-lg leading-relaxed">
            Connect, share and chat instantly with anyone, anytime.
          </p>
          <div className="transform hover:scale-105 transition-transform duration-300">
            <svg
              role="img"
              aria-label="Messenger Logo"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="white"
              className="w-40 h-40 drop-shadow-lg"
            >
              <path d="M2 3a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6l-4 4V3z" />
              <circle cx="8" cy="10" r="1.5" fill="#2563eb" />
              <circle cx="12" cy="10" r="1.5" fill="#2563eb" />
              <circle cx="16" cy="10" r="1.5" fill="#2563eb" />
            </svg>
          </div>
        </div>

        {/* Right Panel (Signup Form) */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-2xl font-bold text-blue-600 mb-2">
            Create Account
          </h2>
          <p className="text-gray-600 mb-6">
            Register to start chatting with friends
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full Name */}
            <input
              type="text"
              {...register("name", {
                required: "Full name is required",
                minLength: { value: 3, message: "Minimum 3 characters" },
                pattern: {
                  value: /^[A-Za-z][A-Za-z ]*$/,
                  message: "Only letters and spaces allowed",
                },
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Full Name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}

            {/* Email */}
            <input
              type="text"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Invalid email format",
                },
              })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "At least 8 characters" },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
                    message:
                      "Must include uppercase, lowercase, number, and special character",
                  },
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
              />
              <span
                className="absolute right-3 top-3 cursor-pointer text-sm text-gray-600 select-none"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </span>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmpassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm Password"
              />
              <span
                className="absolute right-3 top-3 cursor-pointer text-sm text-gray-600 select-none"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </span>
              {errors.confirmpassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmpassword.message}
                </p>
              )}
            </div>

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
              Register Now
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Signup;
