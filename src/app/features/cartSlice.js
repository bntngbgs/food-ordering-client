import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  isAuth: false,
  total: 0,
  showModal: false,
  badgeCount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toogleModal: (state, action) => {
      state.showModal = action.payload;
    },
    addToCart: (state, action) => {
      state.cart.push(action.payload);
      state.badgeCount += 1;
    },
    clearCart: () => initialState,
  },
});

export const { toogleModal, addToCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
