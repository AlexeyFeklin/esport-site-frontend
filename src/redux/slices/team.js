import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../axios';

export const createTeam = createAsyncThunk('/teams/createTeam', async (params) => {
  const { data } = await axios.post('/teams', params);
  return data;
});

export const getTeamsByTournament = createAsyncThunk(
  '/teams/getTeamsByTournament',
  async (tournamentId) => {
    const { data } = await axios.get(`/teams/tournament/${tournamentId}`);
    return data;
  },
);

export const addMemberToTeam = createAsyncThunk('/teams/addMemberToTeam', async (params) => {
  const { data } = await axios.post('/teams/addMember', params);
  return data;
});

export const removeMemberFromTeam = createAsyncThunk(
  '/teams/removeMemberFromTeam',
  async (params) => {
    const { data } = await axios.post('/teams/removeMember', params);
    return data;
  },
);

const initialState = { data: null, status: 'loading', players: [] };

const teamSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    addPlayers: (state, action) => {
      if (action.payload !== null) {
        state.players.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTeam.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
      })
      .addCase(createTeam.pending, (state, action) => {
        state.status = 'loading';
        state.data = null;
      })
      .addCase(createTeam.rejected, (state, action) => {
        state.status = 'error';
        state.data = null;
      });
    builder
      .addCase(getTeamsByTournament.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
      })
      .addCase(getTeamsByTournament.pending, (state, action) => {
        state.status = 'loading';
        state.data = null;
      })
      .addCase(getTeamsByTournament.rejected, (state, action) => {
        state.status = 'error';
        state.data = null;
      });
    builder
      .addCase(addMemberToTeam.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
      })
      .addCase(addMemberToTeam.pending, (state, action) => {
        state.status = 'loading';
        state.data = null;
      })
      .addCase(addMemberToTeam.rejected, (state, action) => {
        state.status = 'error';
        state.data = null;
      });
    builder
      .addCase(removeMemberFromTeam.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
      })
      .addCase(removeMemberFromTeam.pending, (state, action) => {
        state.status = 'loading';
        state.data = null;
      })
      .addCase(removeMemberFromTeam.rejected, (state, action) => {
        state.status = 'error';
        state.data = null;
      });
  },
});

export const selectTeamData = (state) => state.teams.data;
export const selectTeamStatus = (state) => state.teams.status;
export const selectTeamPlayers = (state) => state.teams.players;

export const teamReducer = teamSlice.reducer;
export const { addPlayers } = teamSlice.actions;
