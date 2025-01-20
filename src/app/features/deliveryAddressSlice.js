import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  address: [],
  selectedAddress: [],
  toggleForm: false,
  isFromCheckoutAddress: false,
  isLoading: false,
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
    setCheckoutAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
    setAddressInCheckout: (state, action) => {
      state.isFromCheckoutAddress = action.payload;
    },
    setAddressLoadingState: (state, action) => {
      state.isLoading = action.payload;
    },
    removeWhenLogout: () => initialState,
  },
});

export const {
  addAddress,
  toggleAddressForm,
  removeWhenLogout,
  fetchWhenLogin,
  setCheckoutAddress,
  setAddressInCheckout,
  setAddressLoadingState,
} = deliveryAddressSlice.actions;

export default deliveryAddressSlice.reducer;
