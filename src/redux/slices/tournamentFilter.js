import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../axios';

export const getTotalTournaments = createAsyncThunk(
  'tournaments/getTotalTournamentsStatus',
  async ({ city, entryFee, status } = {}) => {
    let url = '?';

    if (city) {
      url += `&city=${city}`;
    }

    if (entryFee !== undefined) {
      url += `&entryFee=${entryFee}`;
    }
    if (status !== undefined) {
      url += `&status=${status}`;
    }

    let { data } = await axios.get(`/tournaments/totalCount${url}`);
    return data;
  },
);

export const initialState = {
  modalActive: false,
  filters: {
    city: 0,
    entryFee: 0,
    status: 0,
    currentPage: 1,
    limit: 4,
    countTournaments: 0,
  },
  status: '',
};

const newsFilter = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setModalActive(state, action) {
      state.modalActive = action.payload;
    },
    setTournamentFilters(state, action) {
      if (action.payload.city !== undefined) {
        state.filters.city = action.payload.city;
      }
      if (action.payload.entryFee !== undefined) {
        state.filters.entryFee = action.payload.entryFee;
      }
      if (action.payload.status !== undefined) {
        state.filters.status = action.payload.status;
      }
      if (action.payload.currentPage !== undefined) {
        state.filters.currentPage = action.payload.currentPage;
      }
      if (action.payload.limit !== undefined) {
        state.filters.limit = action.payload.limit;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTotalTournaments.fulfilled, (state, action) => {
        state.filters.countTournaments = action.payload.count;
        state.status = 'success';
      })
      .addCase(getTotalTournaments.pending, (state, action) => {
        state.status = 'loading';
        state.filters.countTournaments = 0;
      })
      .addCase(getTotalTournaments.rejected, (state, action) => {
        state.status = 'error';
        state.filters.countTournaments = 0;
      });
  },
});

export const { setModalActive, setTournamentFilters } = newsFilter.actions;
export const selectModalActive = (state) => state.tournamentFilter.modalActive;
export const selectTournamentsFilters = (state) => state.tournamentFilter.filters;

export default newsFilter.reducer;
