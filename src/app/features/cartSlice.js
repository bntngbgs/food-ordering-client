import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  isAuth: false,
  totalPrice: 0,
  itemCount: 0,
  showModal: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toogleModal: (state, action) => {
      state.showModal = action.payload;
    },
    addToCart: (state, action) => {
      if (state.cart.some((item) => item.title === action.payload.title)) {
        let targetItem = state.cart.find(
          (item) => item.title === action.payload.title
        );

        targetItem.qty += 1;
      } else {
        state.cart.push(action.payload);
        state.itemCount = state.cart.length;
      }
    },
    incrementQty: (state, action) => {
      let targetItem = state.cart.find((item) => item.title === action.payload);

      targetItem.qty++;
    },
    decrementQty: (state, action) => {
      let targetItem = state.cart.find((item) => item.title === action.payload);

      targetItem.qty--;

      if (targetItem.qty == 0) {
        state.cart = state.cart.filter(
          (item) => item.title !== targetItem.title
        );
        state.itemCount = state.cart.length;
      }
    },
    clearCart: () => initialState,
  },
});

export const { toogleModal, addToCart, incrementQty, decrementQty, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
