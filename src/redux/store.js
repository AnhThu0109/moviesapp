import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./loginSlice";

export default configureStore({
  reducer: {
    authentication: authenticationReducer,
  },
});
