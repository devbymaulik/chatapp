import axios from "axios";
const serverCall = async (
  url,
  method = "GET",
  data = {},
  additionalHeaders = {},
  withCredentials = true
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
    withCredentials,
  };

  if (requestConfig.method !== "GET") {
    requestConfig.data = data;
  }

  try {
    const response = await axios.request(requestConfig);
    return {
      success: true,
      data: response.data.user || response.data.data || {},
      message: response.data.message || "Success",
    };
  } catch (error) {
    // You can optionally show a toast here or just return error info
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "API request failed";
    return {
      success: false,
      data: {},
      message,
    };
  }
};
export default serverCall;
