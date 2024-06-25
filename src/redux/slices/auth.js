import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../axios';

export const fetchAuth = createAsyncThunk('/auth/fetchAuth', async (params) => {
  const { data } = await axios.post('/auth/login', params);
  return data;
});
export const fetchAuthMe = createAsyncThunk('/auth/fetchAuthMe', async () => {
  const { data } = await axios.get('/auth/me');
  return data;
});
export const fetchRegister = createAsyncThunk('/auth/fetchRegister', async (params) => {
  const { data } = await axios.post('/auth/register', params);
  return data;
});
export const fetchUpdate = createAsyncThunk('/auth/fetchUpdate', async (params) => {
  const { data } = await axios.patch('/auth/change', params);
  return data;
});
export const fetchUserById = createAsyncThunk('/auth/fetchUserById', async (id) => {
  const { data } = await axios.get(`/auth/${id}`);
  return data;
});

export const fetchUsersById = createAsyncThunk('/auth/fetchUsersById', async (id) => {
  const { data } = await axios.get(`/auth/${id}`);
  return data;
});

export const fetchSearchUsers = createAsyncThunk('auth/fetchSearchUsers', async (value) => {
  let url = '?q=';
  if (value.length > 1) {
    url += value;
  }
  const { data } = await axios.get(`/auth/search${url}`);
  return data;
});
export const fetchChangeUserRole = createAsyncThunk(
  '/auth/fetchChangeUserRole',
  async ({ userId, role }) => {
    const { data } = await axios.patch(`/auth/changeRole/${userId}`, role);
    return data;
  },
);

const initialState = {
  data: null,
  status: 'loading',
  selectedUser: '',
  selectedUsers: [],
  modalSearchPlayers: false,
  foundPeoples: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
    cleaningSelectedUsers: (state) => {
      state.selectedUsers = [];
    },
    setModalSearchPlayers: (state, action) => {
      state.modalSearchPlayers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
      })
      .addCase(fetchAuth.pending, (state, action) => {
        state.status = 'loading';
        state.data = null;
      })
      .addCase(fetchAuth.rejected, (state, action) => {
        state.status = 'error';
        state.data = null;
      });
    builder
      .addCase(fetchAuthMe.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
      })
      .addCase(fetchAuthMe.pending, (state, action) => {
        state.status = 'loading';
        state.data = null;
      })
      .addCase(fetchAuthMe.rejected, (state, action) => {
        state.status = 'error';
        state.data = null;
      });
    builder
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
      })
      .addCase(fetchRegister.pending, (state, action) => {
        state.status = 'loading';
        state.data = null;
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.status = 'error';
        state.data = null;
      });
    builder
      .addCase(fetchUpdate.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
      })
      .addCase(fetchUpdate.pending, (state, action) => {
        state.status = 'loading';
        state.data = null;
      })
      .addCase(fetchUpdate.rejected, (state, action) => {
        state.status = 'error';
        state.data = null;
      });
    builder
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = 'success';
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserById.pending, (state, action) => {
        state.status = 'loading';
        state.selectedUser = null;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = 'error';
        state.selectedUser = null;
      });
    builder
      .addCase(fetchUsersById.fulfilled, (state, action) => {
        state.status = 'success';
        state.selectedUsers.push(action.payload);
      })
      .addCase(fetchUsersById.pending, (state, action) => {
        state.status = 'loading';
        state.selectedUsers = [];
      })
      .addCase(fetchUsersById.rejected, (state, action) => {
        state.status = 'error';
        state.selectedUsers = [];
      });
    builder
      .addCase(fetchChangeUserRole.fulfilled, (state, action) => {
        state.status = 'success';
      })
      .addCase(fetchChangeUserRole.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchChangeUserRole.rejected, (state, action) => {
        state.status = 'error';
      });
    builder
      .addCase(fetchSearchUsers.fulfilled, (state, action) => {
        state.status = 'success';
        state.foundPeoples = action.payload;
      })
      .addCase(fetchSearchUsers.pending, (state, action) => {
        state.status = 'loading';
        state.foundPeoples = [];
      })
      .addCase(fetchSearchUsers.rejected, (state, action) => {
        state.status = 'error';
        state.foundPeoples = [];
      });
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);
export const selectIsAuthData = (state) => state.auth.data;
export const selectSelectedUser = (state) => state.auth.selectedUser;
export const selectSelectedUsers = (state) => state.auth.selectedUsers;

export const selectModalSearchPlayers = (state) => state.auth.modalSearchPlayers;

export const authReducer = authSlice.reducer;

export const { logout, cleaningSelectedUsers, setModalSearchPlayers } = authSlice.actions;
