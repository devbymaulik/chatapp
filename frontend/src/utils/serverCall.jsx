import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// ✅ Axios instance with global config
const api = axios.create({
  baseURL: "https://chatapp-vuht.onrender.com", // Your backend
  withCredentials: true, // ✅ required for cookies
});
const serverCall = async (
  url,
  method = "GET",
  data = {},
  additionalHeaders = {}
) => {
  const isFormData = data instanceof FormData;

  const headers = {
    ...(isFormData
      ? { "Content-Type": "multipart/form-data" }
      : { "Content-Type": "application/json" }),
    ...additionalHeaders,
  };
  const requestConfig = {
    url,
    method: method.toUpperCase(),
    headers,
  };

  if (requestConfig.method !== "GET") {
    requestConfig.data = data;
  }
  try {
    const response = await api.request(requestConfig);
    return {
      success: true,
      data: response.data.user || response.data.data || {},
      message: response.data.message || "Success",
    };
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "API request failed";

    // Optional: Show toast for errors
    toast.error(message);

    return {
      success: false,
      data: {},
      message,
    };
  }
};
export default serverCall;
