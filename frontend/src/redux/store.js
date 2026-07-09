import { configureStore } from "@reduxjs/toolkit";
import hcpReducer from "./hcpSlice";
import interactionReducer from "./interactionSlice";

export const store = configureStore({
  reducer: {
    hcp: hcpReducer,
    interaction: interactionReducer,
  },
});