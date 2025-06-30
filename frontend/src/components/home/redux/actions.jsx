// Get User actions.js
export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";
export function fetchUserRequest() {
  return {
    type: FETCH_USERS_REQUEST,
  };
}
export function fetchUserSuccess(data) {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: data,
  };
}
export function fetchUserFailure(error) {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
}
// Get Message Actions
export const FETCH_MESSAGE_REQUEST = "FETCH_MESSAGE_REQUEST";
export const FETCH_MESSAGE_SUCCESS = "FETCH_MESSAGE_SUCCESS";
export const FETCH_MESSAGE_FAILURE = "FETCH_MESSAGE_FAILURE";
export function fetchMessageRequest() {
  return {
    type: "FETCH_MESSAGE_REQUEST",
  };
}
export function fetchMessageSuccess(data) {
  return {
    type: "FETCH_MESSAGE_SUCCESS",
    payload: data,
  };
}
export function fetchMessageFailure(error) {
  return {
    type: "FETCH_MESSAGE_FAILURE",
    payload: error,
  };
}
//Sent Message
export const SEND_MESSAGE_REQUEST = "SEND_MESSAGE_REQUEST";
export const SEND_MESSAGE_SUCCESS = "SEND_MESSAGE_SUCCESS";
export const SEND_MESSAGE_FAILURE = "SEND_MESSAGE_FAILURE";
export function sendMessageRequest() {
  return {
    type: "SEND_MESSAGE_REQUEST",
  };
}
export function sendMessageSuccess(error) {
  return {
    type: "SEND_MESSAGE_SUCCESS",
    payload: data,
  };
}
export function sendMessageFailure(error) {
  return {
    type: "SEND_MESSAGE_FAILURE",
    payload: error,
  };
}

export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";
export const receiveMessage = (message) => ({
  type: RECEIVE_MESSAGE,
  payload: message,
});
