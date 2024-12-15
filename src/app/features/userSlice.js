import { createSlice } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';

const initialState = {
  full_name: '',
  email: '',
  customer_id: '',
  role: 'guest',
  loading: false,
  token: '',
  id: '',
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
      // state.token = action.payload.token;
    },
    userLogout: () => initialState,
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
        // state.token = action.payload.token;
      }
    });
  },
});

export const { userLogin, userLogout } = userSlice.actions;

export default userSlice.reducer;
