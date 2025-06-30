import useConversation from "../../../statemanage/useConversation";
import apiEndPoint from "../../../utils/apiList";
import serverCall from "../../../utils/serverCall";
import {
  fetchMessageFailure,
  fetchMessageRequest,
  fetchMessageSuccess,
  fetchUserFailure,
  fetchUserRequest,
  fetchUserSuccess,
  sendMessageFailure,
  sendMessageRequest,
  sendMessageSuccess,
} from "./actions";
export const getUser = (query = "") => {
  return async (dispatch) => {
    dispatch(fetchUserRequest());
    try {
      // Build URL with optional search query
      const url = query
        ? `${apiEndPoint.GET_USERS}?q=${encodeURIComponent(query)}`
        : apiEndPoint.GET_USERS;
      const result = await serverCall(url, "GET");
      if (result.success === true) {
        dispatch(fetchUserSuccess(result.data));
      } else {
        dispatch(fetchUserFailure(result?.message || "Unknown error occurred"));
      }
    } catch (error) {
      dispatch(fetchUserFailure(error.message || "Request failed"));
    }
  };
};

export const getMessage = (receiverId) => {
  return async (dispatch) => {
    dispatch(fetchMessageRequest());
    try {
      const result = await serverCall(
        `${apiEndPoint.GET_MESSAGE}/${receiverId}`,
        "GET"
      );
      if (result.success === true) {
        dispatch(fetchMessageSuccess(result.data));
      } else {
        dispatch(
          fetchMessageFailure(result?.message || "Unknown error occurred")
        );
      }
    } catch (error) {
      dispatch(fetchMessageFailure(error.message || "Request failed"));
    }
  };
};
export const sendMessage = (receiverId, data) => {
  return async (dispatch) => {
    dispatch(sendMessageRequest());
    try {
      const result = await serverCall(
        `${apiEndPoint.SEND_MESSAGE}/${receiverId}`,
        "POST",
        data
      );
      if (result.success === true) {
        dispatch(sendMessageSuccess(result.data));
      } else {
        dispatch(
          sendMessageFailure(result?.message || "Unknown error occurred")
        );
      }
    } catch (error) {
      dispatch(sendMessageFailure(error.message || "Request failed"));
    }
  };
};
