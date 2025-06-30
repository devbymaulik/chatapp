import { applyMiddleware, createStore } from "redux";
import { thunk } from "redux-thunk"; // ✅ Correct for ESM (Vite, modern setup)
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import rootReducers from "./Reducers"; // ✅ Corrected path
import { authMiddleware } from "../middleware/authMiddleware"; // ✅ Optional custom middleware

// Redux persist config
const persistConfig = {
  key: "root",
  storage,
  /* whitelist: ["signinReducer"], // ✅ Optional: persist only what you need */
};
const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = createStore(
  persistedReducer,
  applyMiddleware(thunk, authMiddleware)
);
const persistor = persistStore(store);
export { store, persistor };
