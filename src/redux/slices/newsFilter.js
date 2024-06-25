import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../axios';

export const getCountNews = createAsyncThunk('news/getCountNews', async (category) => {
  let { data } = await axios.get(`/news/totalCount?category=${category || 0}`);
  return data;
});

export const initialState = {
  filters: { categoryId: 0, currentPage: 1, limit: 5, countNews: 0 },
  status: '',
};

const newsFilter = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setNewsCategoryId(state, action) {
      state.filters.categoryId = action.payload;
    },
    setNewsCurrentPage(state, action) {
      state.filters.currentPage = action.payload;
    },
    setNewsFilters(state, action) {
      state.filters.limit = action.payload.limit;
      state.filters.currentPage = Number(action.payload.currentPage);
      state.filters.categoryId = Number(action.payload.categoryId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCountNews.fulfilled, (state, action) => {
        state.filters.countNews = action.payload.totalNewsCount;
        state.status = 'success';
      })
      .addCase(getCountNews.pending, (state, action) => {
        state.status = 'loading';
        state.filters.countNews = 0;
      })
      .addCase(getCountNews.rejected, (state, action) => {
        state.status = 'error';
        state.filters.countNews = 0;
      });
  },
});

export const selectNewsFilters = (state) => state.newsFilter.filters;
export const { setNewsCategoryId, setNewsCurrentPage, setNewsFilters } = newsFilter.actions;

export default newsFilter.reducer;
