import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  limit: 8,
  skip: 0,
  count: 0,
  filteredCount: 0,
  category: '',
  tags: [],
  searchQuery: '',
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addAllProducts: (state, action) => {
      state.products = action.payload;
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
    clearCategory: (state) => {
      state.category = '';
    },
    addTags: (state, action) => {
      state.tags.push(action.payload);
    },
    removeTags: (state, action) => {
      state.tags = state.tags.filter((tag) => tag !== action.payload);
    },
    clearTags: (state) => {
      state.tags = [];
    },
    addSearch: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearSearch: (state) => {
      state.searchQuery = '';
    },
    resetSkip: (state) => {
      state.skip = 0;
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
  clearCategory,
  addTags,
  removeTags,
  clearTags,
  addSearch,
  clearSearch,
  resetSkip,
} = productSlice.actions;

export default productSlice.reducer;
