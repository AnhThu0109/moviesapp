import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./loginSlice";
import loadingReducer from "./loadingSlice";

export default configureStore({
  reducer: {
    authentication: authenticationReducer,
    loading: loadingReducer,
  },
});
