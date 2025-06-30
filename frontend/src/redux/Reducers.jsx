import { combineReducers } from "redux";
import registerReducer from "../components/signup/redux/reducer";
import signinReducer from "../components/signin/redux/reducer";
import {
  getMessageReducer,
  sendMessageReducer,
  userReducer,
} from "../components/home/redux/reducer";
const appReducers = combineReducers({
  registerReducer: registerReducer,
  signinReducer: signinReducer,
  userReducer: userReducer,
  getMessageReducer: getMessageReducer,
  sendMessageReducer: sendMessageReducer,
});
const rootReducers = (state, action) => {
  return appReducers(state, action);
};
export default rootReducers;
