import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";



const store = configureStore({
  reducer: {
      // users:userReducer,
      auth:authReducer,
  }
})


export default store;