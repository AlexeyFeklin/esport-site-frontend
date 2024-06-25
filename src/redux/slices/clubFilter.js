import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../axios';

export const initialState = {
  filters: { city: 0, currentPage: 1, limit: 4, countClubs: 0 },
};

export const getTotalClubCount = createAsyncThunk(
  'clubs/getTotalClubCountStatus',
  async ({ city }) => {
    let url = `?`;
    if (city) {
      url += `city=${city}`;
    }
    let { data } = await axios.get(`/clubs/totalCount${url}`);
    return data;
  },
);

const clubFilter = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setClubFilters(state, action) {
      if (action.payload.limit !== undefined) {
        state.filters.limit = Number(action.payload.limit);
      }
      if (action.payload.currentPage !== undefined) {
        state.filters.currentPage = Number(action.payload.currentPage);
      }
      if (action.payload.city !== undefined) {
        state.filters.city = Number(action.payload.city);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTotalClubCount.fulfilled, (state, action) => {
        state.filters.countClubs = action.payload.count;
        state.status = 'success';
      })
      .addCase(getTotalClubCount.pending, (state, action) => {
        state.status = 'loading';
        state.filters.countClubs = 0;
      })
      .addCase(getTotalClubCount.rejected, (state, action) => {
        state.status = 'error';
        state.filters.countClubs = 0;
      });
  },
});

export const selectClubFilters = (state) => state.clubFilter.filters;
export const { setClubFilters } = clubFilter.actions;

export default clubFilter.reducer;
