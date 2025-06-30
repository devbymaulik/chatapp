import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiEndPoint from "../../../utils/apiList";
import serverCall from "../../../utils/serverCall";
import {
  errorRegisterRequestData,
  registerRequestData,
  setRegisterRequestData,
} from "./actions";
import { useNavigate } from "react-router-dom";
const registerUser = (data) => {
  return async (dispatch) => {
    dispatch(registerRequestData());
    try {
      let result = await serverCall(apiEndPoint.USER_REGISTER, "POST", data);
      if (result.success === true) {
        dispatch(setRegisterRequestData(result?.data));
        toast.success("User registered successfully");
      } else {
        dispatch(errorRegisterRequestData(result?.message));
        toast.error(result?.message || "Registration failed");
      }
    } catch (error) {
      dispatch(errorRegisterRequestData(error));
      toast.error(
        error?.message || "An unexpected error occurred during registration"
      );
    }
  };
};
export default registerUser;
