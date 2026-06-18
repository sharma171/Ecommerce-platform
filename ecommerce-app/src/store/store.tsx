import { configureStore } from "@reduxjs/toolkit";
import EcommerceReducer from "./EcommerceSlice";

export const store = configureStore({
    reducer: {
        ecommerce: EcommerceReducer,
    },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
