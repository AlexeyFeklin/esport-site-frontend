import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../axios';

export const getAllClubs = createAsyncThunk(
  'clubs/getAllClubsStatus',
  async ({ page, limit, city }) => {
    let url = '';
    if (city) {
      url += `&city=${city}`;
    }
    let { data } = await axios.get(`/clubs?page=${page}&limit=${limit}${url}`);
    return data;
  },
);
export const getAllClubsByCity = createAsyncThunk('clubs/getAllClubsByCityStatus', async (city) => {
  let { data } = await axios.get(`/clubsByCity?city=${city}`);
  return data;
});

export const fetchOneClub = createAsyncThunk('clubs/fetchOneClubStatus', async (id) => {
  let { data } = await axios.get(`/clubs/${id}`);
  return data;
});

export const createClub = createAsyncThunk('clubs/createClubStatus', async (clubData) => {
  let { data } = await axios.post('/clubs', clubData);
  return data;
});

export const removeClub = createAsyncThunk('clubs/removeClubStatus', async (id) => {
  let { data } = await axios.delete(`/clubs/${id}`);
  return data;
});

export const updateClub = createAsyncThunk('clubs/updateClubStatus', async ({ id, clubData }) => {
  let { data } = await axios.patch(`/clubs/${id}`, clubData);
  return data;
});

export const initialState = { clubs: [], selectedClub: '', status: '' };

const clubSlice = createSlice({
  name: 'clubs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllClubs.fulfilled, (state, action) => {
        state.clubs = action.payload;
        state.status = 'success';
      })
      .addCase(getAllClubs.pending, (state, action) => {
        state.status = 'loading';
        state.clubs = [];
      })
      .addCase(getAllClubs.rejected, (state, action) => {
        state.status = 'error';
        state.clubs = [];
      });
    builder
      .addCase(getAllClubsByCity.fulfilled, (state, action) => {
        state.clubs = action.payload;
        state.status = 'success';
      })
      .addCase(getAllClubsByCity.pending, (state, action) => {
        state.status = 'loading';
        state.clubs = [];
      })
      .addCase(getAllClubsByCity.rejected, (state, action) => {
        state.status = 'error';
        state.clubs = [];
      });

    builder
      .addCase(fetchOneClub.fulfilled, (state, action) => {
        state.selectedClub = action.payload;
        state.status = 'success';
      })
      .addCase(fetchOneClub.pending, (state, action) => {
        state.status = 'loading';
        state.selectedClub = '';
      })
      .addCase(fetchOneClub.rejected, (state, action) => {
        state.status = 'error';
        state.selectedClub = '';
      });

    builder
      .addCase(removeClub.fulfilled, (state, action) => {
        state.status = 'success';
      })
      .addCase(removeClub.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(removeClub.rejected, (state, action) => {
        state.status = 'error';
      });
  },
});

export const selectClubs = (state) => state.clubs.clubs;
export const selectClubStatus = (state) => state.clubs.status;
export const selecetSelectedClub = (state) => state.clubs.selectedClub;

export const clubReducer = clubSlice.reducer;
