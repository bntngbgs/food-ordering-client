import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  limit: 8,
  skip: 0,
  count: 0,
  category: '',
  tags: [],
  searchQuery: '',
  isLoading: false,
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
    setLoadingState: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  addAllProducts,
  setDocumentLength,
  incrementSkip,
  decrementSkip,
  selectPage,
  setGlobalCount,
  addCategory,
  clearCategory,
  addTags,
  removeTags,
  clearTags,
  addSearch,
  clearSearch,
  resetSkip,
  setLoadingState,
} = productSlice.actions;

export default productSlice.reducer;
