import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  address: [],
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
    toggleAddressForm: (state) => {
      state.toggleForm = !state.toggleForm;
    },
    removeWhenLogout: () => initialState,
    fetchWhenLogin: (state, action) => {
      state.address = action.payload.data;
    },
  },
});

export const {
  addAddress,
  toggleAddressForm,
  removeWhenLogout,
  fetchWhenLogin,
} = deliveryAddressSlice.actions;

export default deliveryAddressSlice.reducer;
