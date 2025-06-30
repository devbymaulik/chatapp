import {
  ERROR_REGISTER_REQUEST_DATA,
  INIT_REGISTER_REQUEST_DATA,
  SET_REGISTER_REQUEST_DATA,
} from "./actions";
const setInitialization = {
  data: [],
  isLoading: false,
  error: "",
};
const registerReducer = (state = setInitialization, actions) => {
  switch (actions.type) {
    case INIT_REGISTER_REQUEST_DATA:
      return { ...state, data: [], error: "", isLoading: true };
    case SET_REGISTER_REQUEST_DATA:
      return { ...state, data: actions.payload, error: "", isLoading: false };
    case ERROR_REGISTER_REQUEST_DATA:
      return { ...state, data: [], error: actions.payload, isLoading: false };
    default:
      return state;
  }
};
export default registerReducer;
