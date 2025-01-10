import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  address: [],
  selectedAddress: [],
  toggleForm: false,
};

const deliveryAddressSlice = createSlice({
  name: 'deliveryAddress',
  initialState,
  reducers: {
    addAddress: (state, action) => {
      state.address = [...state.address, action.payload];
      state.toggleForm = false;
    },
    toggleAddressForm: (state, action) => {
      state.toggleForm = action.payload;
    },
    fetchWhenLogin: (state, action) => {
      state.address = action.payload.data;
    },
    removeWhenLogout: () => initialState,
    setCheckoutAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
  },
});

export const {
  addAddress,
  toggleAddressForm,
  removeWhenLogout,
  fetchWhenLogin,
  setCheckoutAddress,
} = deliveryAddressSlice.actions;

export default deliveryAddressSlice.reducer;
