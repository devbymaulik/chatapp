import {
  ERROR_SIGNIN_REQUEST_DATA,
  INIT_SIGNIN_REQUEST_DATA,
  SET_SIGNIN_REQUEST_DATA,
  LOGOUT_USER,
} from "./action";
const setInitialization = {
  data: "",
  isLoading: false,
  error: "",
  isLogin: false,
};
const signinReducer = (state = setInitialization, action) => {
  switch (action.type) {
    case INIT_SIGNIN_REQUEST_DATA:
      return { ...state, data: "", error: "", isLoading: true, isLogin: false };
    case SET_SIGNIN_REQUEST_DATA:
      return {
        ...state,
        data: action.payload,
        error: "",
        isLoading: false,
        isLogin: true,
      };
    case ERROR_SIGNIN_REQUEST_DATA:
      return {
        ...state,
        data: "",
        error: action.payload,
        isLoading: false,
        isLogin: false,
      };
    case LOGOUT_USER:
      return {
        ...state,
        data: "",
        error: "",
        isLoading: false,
        isLogin: false,
      };
    default:
      return state;
  }
};
export default signinReducer;
