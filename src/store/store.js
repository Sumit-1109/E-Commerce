import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice";
import cartReducer from "./slices/cartSlice";
import modalReducer from "./slices/modalSlice";

const store = configureStore({
  reducer: {
    category: categoryReducer,
    cart: cartReducer,
    modal: modalReducer,
  },
});

export default store;