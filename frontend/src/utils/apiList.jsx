const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
const apiEndPoint = {
  /* USER API ENDPOINT */
  USER_REGISTER: `${API_BASE_URL}/api/user/signup`,
  USER_SIGNIN: `  ${API_BASE_URL}/api/user/signin`,
  USER_LOGOUT: `  ${API_BASE_URL}/api/user/logout`,
  REFRESH_TOKEN: `  ${API_BASE_URL}/api/user/refreshToken`,
  GET_USERS: `  ${API_BASE_URL}/api/user/getUsers`,
  GET_MESSAGE: `  ${API_BASE_URL}/api/message/getmessage`,
  SEND_MESSAGE: `  ${API_BASE_URL}/api/message/sendmessage`,
  UPDATE_USER: `  ${API_BASE_URL}/api/user/updateUser`,
};
export default apiEndPoint;
