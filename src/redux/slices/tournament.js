import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../axios';

export const getAllTournaments = createAsyncThunk(
  'tournaments/getAllTournamentsStatus',
  async ({ page, limit, city, entryFee, status } = {}) => {
    let url = '';

    if (city) {
      url += `&city=${city}`;
    }

    if (entryFee !== undefined) {
      url += `&entryFee=${entryFee}`;
    }
    if (status !== undefined) {
      url += `&status=${status}`;
    }

    let { data } = await axios.get(`/tournaments?page=${page || 1}&limit=${limit || 4}${url}`);
    return data;
  },
);

export const fetchOneTournament = createAsyncThunk(
  'tournaments/fetchOneTournamentStatus',
  async (id) => {
    let { data } = await axios.get(`/tournaments/${id}`);
    return data;
  },
);

export const createTournament = createAsyncThunk(
  'tournaments/createTournamentStatus',
  async (tournamentData) => {
    let { data } = await axios.post('/tournaments', tournamentData);
    return data;
  },
);

export const removeTournament = createAsyncThunk(
  'tournaments/removeTournamentStatus',
  async (id) => {
    let { data } = await axios.delete(`/tournaments/${id}`);
    return data;
  },
);

export const updateTournament = createAsyncThunk(
  'tournaments/updateTournamentStatus',
  async ({ id, tournamentData }) => {
    let { data } = await axios.patch(`/tournaments/${id}`, tournamentData);
    return data;
  },
);

export const getAllTournamentsByCreator = createAsyncThunk(
  'tournaments/getAllTournamentsByCreatorStatus',
  async (id) => {
    let { data } = await axios.get(`/tournamentsBy?id=${id}`);
    return data;
  },
);

export const updateTournamentStatus = createAsyncThunk(
  'tournaments/updateTournamentStatus',
  async ({ id, status }) => {
    let { data } = await axios.post(`/tournaments/updateStatus`, { id, status });
    return data;
  },
);

export const initialState = {
  tournaments: [],
  selectedTournament: '',
  totalTournaments: 0,
  status: '',
};

const tournamentSlice = createSlice({
  name: 'tournaments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTournaments.fulfilled, (state, action) => {
        state.tournaments = action.payload;
        state.status = 'success';
      })
      .addCase(getAllTournaments.pending, (state, action) => {
        state.status = 'loading';
        state.tournaments = [];
      })
      .addCase(getAllTournaments.rejected, (state, action) => {
        state.status = 'error';
        state.tournaments = [];
      });
    builder
      .addCase(fetchOneTournament.fulfilled, (state, action) => {
        state.selectedTournament = action.payload;
        state.status = 'success';
      })
      .addCase(fetchOneTournament.pending, (state, action) => {
        state.status = 'loading';
        state.selectedTournament = [];
      })
      .addCase(fetchOneTournament.rejected, (state, action) => {
        state.status = 'error';
        state.selectedTournament = [];
      });
    builder
      .addCase(getAllTournamentsByCreator.fulfilled, (state, action) => {
        state.tournaments = action.payload;
        state.status = 'success';
      })
      .addCase(getAllTournamentsByCreator.pending, (state, action) => {
        state.status = 'loading';
        state.tournaments = [];
      })
      .addCase(getAllTournamentsByCreator.rejected, (state, action) => {
        state.status = 'error';
        state.tournaments = [];
      });
    builder
      .addCase(updateTournamentStatus.fulfilled, (state, action) => {
        state.status = 'success';
      })
      .addCase(updateTournamentStatus.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(updateTournamentStatus.rejected, (state, action) => {
        state.status = 'error';
      });
  },
});

export const selectTournamentsAll = (state) => state.tournaments.tournaments;
export const selecetSelectedTournament = (state) => state.tournaments.selectedTournament;
export const selectTotalTournaments = (state) => state.tournaments.totalTournaments;
export const selectTournamentsStatus = (state) => state.tournaments.status;

export const tournamentReducer = tournamentSlice.reducer;
