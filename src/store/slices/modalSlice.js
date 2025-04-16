import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartOpen: false,
  productDetail: {
    open: false,
    product: null,
  },
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openCart(state) {
      state.cartOpen = true;
    },
    closeCart(state) {
      state.cartOpen = false;
    },
    openProductDetail(state, action) {
      state.productDetail.open = true;
      state.productDetail.product = action.payload;
    },
    closeProductDetail(state) {
      state.productDetail.open = false;
      state.productDetail.product = null;
    },
  },
});

export const {
  openCart,
  closeCart,
  openProductDetail,
  closeProductDetail,
} = modalSlice.actions;

export default modalSlice.reducer;