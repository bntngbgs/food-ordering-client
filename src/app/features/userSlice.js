import { createSlice } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';

const initialState = {
  full_name: '',
  email: '',
  customer_id: '',
  role: 'guest',
  token: '',
  id: '',
  currentOrderId: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.full_name = action.payload.full_name;
      state.email = action.payload.email;
      state.customer_id = action.payload.customer_id;
      state.role = action.payload.role;
      state.id = action.payload._id;
      state.loading = false;
      state.token = action.payload.token;
    },
    userLogout: () => initialState,
    setCurrentOrderId: (state, action) => {
      if (action.payload === undefined) {
        return;
      }

      state.currentOrderId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(REHYDRATE, (state, action) => {
      if (state.user) {
        state.full_name = action.payload.full_name;
        state.email = action.payload.email;
        state.customer_id = action.payload.customer_id;
        state.role = action.payload.role;
        state.id = action.payload._id;
        state.loading = false;
        state.token = action.payload.token;
      }
    });
  },
});

export const { userLogin, userLogout, setCurrentOrderId } = userSlice.actions;

export default userSlice.reducer;
