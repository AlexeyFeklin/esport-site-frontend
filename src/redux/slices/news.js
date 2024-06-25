import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../axios';

export const fetchAllNews = createAsyncThunk(
  'news/fetchAllNewsStatus',
  async ({ page, limit, category }) => {
    let { data } = await axios.get(
      `/news?page=${page || 1}&limit=${limit || 5}&category=${category || 0}`,
    );
    return data;
  },
);

export const searchNewsByTitle = createAsyncThunk('news/searchNewsByTitleStatus', async (title) => {
  let { data } = await axios.get(`/news/search/${title}`);
  return data;
});

export const fetchNewsByCategory = createAsyncThunk(
  'news/fetchNewsByCategoryStatus',
  async (category) => {
    let { data } = await axios.get(`/news${category}`);
    return data;
  },
);

export const fetchOneNews = createAsyncThunk('news/fetchOneNewsStatus', async (id) => {
  let { data } = await axios.get(`/news/${id}`);
  return data;
});

export const createNews = createAsyncThunk('news/createNewsStatus', async (newsData) => {
  let { data } = await axios.post('/news', newsData);
  return data;
});

export const removeNews = createAsyncThunk('news/removeNewsStatus', async (id) => {
  let { data } = await axios.delete(`/news/${id}`);
  return data;
});

export const updateNews = createAsyncThunk('news/updateNewsStatus', async ({ id, newsData }) => {
  let { data } = await axios.patch(`/news/${id}`, newsData);
  return data;
});

export const initialState = {
  news: [],
  selectedNews: '',
  status: '',
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllNews.fulfilled, (state, action) => {
        state.news = action.payload;
        state.status = 'success';
      })
      .addCase(fetchAllNews.pending, (state, action) => {
        state.status = 'loading';
        state.news = [];
      })
      .addCase(fetchAllNews.rejected, (state, action) => {
        state.status = 'error';
        state.news = [];
      });
    builder
      .addCase(fetchNewsByCategory.fulfilled, (state, action) => {
        state.news = action.payload;
        state.status = 'success';
      })
      .addCase(fetchNewsByCategory.pending, (state, action) => {
        state.status = 'loading';
        state.news = [];
      })
      .addCase(fetchNewsByCategory.rejected, (state, action) => {
        state.status = 'error';
        state.news = [];
      });
    builder
      .addCase(fetchOneNews.fulfilled, (state, action) => {
        state.selectedNews = action.payload;
        state.status = 'success';
      })
      .addCase(fetchOneNews.pending, (state, action) => {
        state.status = 'loading';
        state.selectedNews = [];
      })
      .addCase(fetchOneNews.rejected, (state, action) => {
        state.status = 'error';
        state.selectedNews = [];
      });
  },
});

export const selectNewsAll = (state) => state.news.news;
export const selectSelectedNews = (state) => state.news.selectedNews;
export const selectNewsStatus = (state) => state.news.status;

export const newsReducer = newsSlice.reducer;
