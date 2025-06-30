import {
  FETCH_MESSAGE_FAILURE,
  FETCH_MESSAGE_REQUEST,
  FETCH_MESSAGE_SUCCESS,
  FETCH_USERS_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  RECEIVE_MESSAGE,
  SEND_MESSAGE_FAILURE,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
} from "./actions"; // Consider renaming this to ./actionTypes for clarity

//1.Get UserReducer/
const initialState = {
  loading: false,
  data: [],
  error: null,
};
export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
        data: [],
        error: null,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
//2.Get Message Reducer/
const initialStateMessage = {
  loading: false,
  data: [],
  error: null,
};
export const getMessageReducer = (state = initialStateMessage, action) => {
  switch (action.type) {
    case FETCH_MESSAGE_REQUEST:
      return {
        ...state,
        loading: true,
        data: [],
        error: null,
      };
    case FETCH_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case FETCH_MESSAGE_FAILURE:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      };
    case RECEIVE_MESSAGE:
      return {
        ...state,
        data: [...state.data, action.payload], // ✅ Append new message
      };
    default:
      return state;
  }
};

//3.SEND Message Reducer/
const initialStateSendMessage = {
  loading: false,
  data: [],
  error: null,
};
export const sendMessageReducer = (state = initialStateSendMessage, action) => {
  switch (action.type) {
    case SEND_MESSAGE_REQUEST:
      return {
        ...state,
        loading: true,
        data: [],
        error: null,
      };
    case SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case SEND_MESSAGE_FAILURE:
      return {
        ...state,
        loading: false,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
