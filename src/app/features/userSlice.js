import { createSlice } from '@reduxjs/toolkit';
import { REHYDRATE } from 'redux-persist';

const initialState = {
  full_name: '',
  email: '',
  customer_id: '',
  role: 'guest',
  loading: false,
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
      state.loading = false;
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
        state.loading = false;
      }
    });
  },
});

export const { userLogin, userLogout } = userSlice.actions;

export default userSlice.reducer;
