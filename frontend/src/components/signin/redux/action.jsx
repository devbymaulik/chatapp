// Action Types
export const INIT_SIGNIN_REQUEST_DATA = "INIT_SIGNIN_REQUEST_DATA";
export const SET_SIGNIN_REQUEST_DATA = "SET_SIGNIN_REQUEST_DATA";
export const ERROR_SIGNIN_REQUEST_DATA = "ERROR_SIGNIN_REQUEST_DATA";
export const LOGOUT_USER = "LOGOUT_USER";

// Action Creators
export function signinRequestData() {
  return {
    type: INIT_SIGNIN_REQUEST_DATA,
  };
}
export function setSigninRequestData(data) {
  return {
    type: SET_SIGNIN_REQUEST_DATA,
    payload: data,
  };
}
export function errorSigninRequestData(error) {
  return {
    type: ERROR_SIGNIN_REQUEST_DATA,
    payload: error,
  };
}
export function logoutAction() {
  return {
    type: LOGOUT_USER,
  };
}
