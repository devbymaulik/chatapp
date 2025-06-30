import apiEndPoint from "../../../utils/apiList";
import serverCall from "../../../utils/serverCall";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  errorSigninRequestData,
  setSigninRequestData,
  signinRequestData,
  logoutAction,
} from "./action";

// 🔐 Login User Thunk
export const signinUser = (data) => {
  return async (dispatch) => {
    dispatch(signinRequestData());
    try {
      const result = await serverCall(
        apiEndPoint.USER_SIGNIN,
        "POST",
        data,
        {},
        true
      );
      if (result.success === true) {
        dispatch(setSigninRequestData(result.data));
        toast.success("User logged in successfully.");
      } else {
        dispatch(errorSigninRequestData(result?.message || "Login failed"));
        toast.error(result?.message || "Login failed");
      }
    } catch (error) {
      dispatch(
        errorSigninRequestData(
          error?.message || "Unexpected error during login"
        )
      );
      toast.error(error?.message || "Unexpected error during login");
    }
  };
};
// 🚪 Logout User Thunk
export const logoutUser = () => {
  return async (dispatch) => {
    try {
      const result = await serverCall(
        apiEndPoint.USER_LOGOUT,
        "POST",
        {},
        {},
        true
      );
      if (result.success === true) {
        dispatch(logoutAction());
        toast.success("User logged out successfully.");
      } else {
        dispatch(logoutAction());
        toast.error(result?.message || "Logout failed");
      }
    } catch (error) {
      dispatch(
        errorSigninRequestData(
          error?.message || "Unexpected error during logout"
        )
      );
      toast.error(error?.message || "Unexpected error during logout");
    }
  };
};
// 🔄 Refresh Token Thunk
export const refreshTokenUser = () => {
  return async (dispatch) => {
    try {
      const result = await serverCall(
        apiEndPoint.REFRESH_TOKEN,
        "GET",
        {},
        {},
        true
      );
      if (result.success === true) {
        return true;
      } else {
        dispatch(logoutUser());
        return false;
      }
    } catch (error) {
      dispatch(logoutUser());
      return false;
    }
  };
};
