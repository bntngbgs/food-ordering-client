import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  limit: 8,
  skip: 0,
  count: 0,
  filteredCount: 0,
  category: '',
  tags: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addAllProducts: (state, action) => {
      state.products = action.payload;
      // state.skip = 0;
    },
    setDocumentLength: (state, action) => {
      state.count = action.payload;
      state.filteredCount = 0;
    },
    incrementSkip: (state) => {
      state.skip += state.limit;
    },
    decrementSkip: (state) => {
      state.skip -= state.limit;
    },
    selectPage: (state, action) => {
      state.skip = action.payload * state.limit;
    },
    setFilteredCount: (state, action) => {
      state.filteredCount = action.payload.length;
    },
    setGlobalCount: (state, action) => {
      state.count = action.payload.length;
    },
    addCategory: (state, action) => {
      state.category = action.payload;
      state.skip = 0;
    },
    addTags: (state, action) => {
      state.tags.push(action.payload);
    },
    removeTags: (state, action) => {
      state.tags = state.tags.filter((tag) => tag !== action.payload);
    },
  },
});

export const {
  addAllProducts,
  setDocumentLength,
  incrementSkip,
  decrementSkip,
  selectPage,
  setFilteredCount,
  setGlobalCount,
  addCategory,
  addTags,
  removeTags,
} = productSlice.actions;

export default productSlice.reducer;
