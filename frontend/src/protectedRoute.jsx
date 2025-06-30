// chatapp/frontend/src/protectedRoute.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export default function ProtectedRoute({ children }) {
  const { isLogin } = useSelector((state) => state.signinReducer);
  return isLogin ? children : <Navigate to="/signin" />;
}
