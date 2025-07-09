import { configureStore } from "@reduxjs/toolkit";
import toastReducer from "./slice/toastslice";
import { toast } from "react-toastify";
import authReducer from "./slice/authslice";

const store = configureStore({
  reducer: {
    toast: toastReducer,
    auth: authReducer,
  },
});


export default store;
