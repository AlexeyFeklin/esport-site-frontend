import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from '../axios';

export const fetchAllRoleApplications = createAsyncThunk(
  'roleApplications/fetchAllRoleApplicationsStatus',
  async () => {
    let { data } = await axios.get('/roleApplications');
    return data;
  },
);

export const fetchOneRoleApplication = createAsyncThunk(
  'roleApplications/fetchOneRoleApplicationStatus',
  async (id) => {
    let { data } = await axios.get(`/roleApplications/${id}`);
    return data;
  },
);

export const removeRoleApplication = createAsyncThunk(
  'roleApplications/removeRoleApplicationStatus',
  async (id) => {
    let { data } = await axios.delete(`/roleApplications/${id}`);
    return data;
  },
);

export const createRoleApplication = createAsyncThunk(
  'roleApplications/createRoleApplicationStatus',
  async (roleApplicationData) => {
    let { data } = await axios.post('/roleApplications', roleApplicationData);
    return data;
  },
);

export const updateRoleApplicationStatus = createAsyncThunk(
  'roleApplications/updateRoleApplicationStatusStatus',
  async ({ id, roleApplicationData }) => {
    let { data } = await axios.post(`/roleApplications/${id}`, roleApplicationData);
    return data;
  },
);

export const updateRoleApplication = createAsyncThunk(
  'roleApplications/updateRoleApplicationStatus',
  async ({ id, roleApplicationData }) => {
    let { data } = await axios.patch(`/roleApplications/${id}`, roleApplicationData);
    return data;
  },
);

export const roleApplicationInitialState = {
  roleApplications: [],
  selectedRoleApplication: '',
  status: '',
};

const roleApplicationSlice = createSlice({
  name: 'roleApplications',
  initialState: roleApplicationInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchAllRoleApplications
      .addCase(fetchAllRoleApplications.fulfilled, (state, action) => {
        state.roleApplications = action.payload;
        state.status = 'success';
      })
      .addCase(fetchAllRoleApplications.pending, (state, action) => {
        state.status = 'loading';
        state.roleApplications = [];
      })
      .addCase(fetchAllRoleApplications.rejected, (state, action) => {
        state.status = 'error';
        state.roleApplications = [];
      })

      // fetchOneRoleApplication
      .addCase(fetchOneRoleApplication.fulfilled, (state, action) => {
        state.selectedRoleApplication = action.payload;
        state.status = 'success';
      })
      .addCase(fetchOneRoleApplication.pending, (state, action) => {
        state.status = 'loading';
        state.selectedRoleApplication = '';
      })
      .addCase(fetchOneRoleApplication.rejected, (state, action) => {
        state.status = 'error';
        state.selectedRoleApplication = '';
      })

      // createRoleApplication
      .addCase(createRoleApplication.fulfilled, (state, action) => {
        state.roleApplications.push(action.payload);
        state.status = 'success';
      })
      .addCase(createRoleApplication.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(createRoleApplication.rejected, (state, action) => {
        state.status = 'error';
      })

      // updateRoleApplicationStatus
      .addCase(updateRoleApplicationStatus.fulfilled, (state, action) => {
        state.roleApplications = state.roleApplications.map((roleApp) =>
          roleApp.id === action.payload.id ? action.payload : roleApp,
        );
        state.status = 'success';
      })
      .addCase(updateRoleApplicationStatus.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(updateRoleApplicationStatus.rejected, (state, action) => {
        state.status = 'error';
      })

      // removeRoleApplication
      .addCase(removeRoleApplication.fulfilled, (state, action) => {
        state.roleApplications = state.roleApplications.filter(
          (roleApp) => roleApp.id !== action.payload.id,
        );
        state.status = 'success';
      })
      .addCase(removeRoleApplication.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(removeRoleApplication.rejected, (state, action) => {
        state.status = 'error';
      });
  },
});

export const selectRoleApplcations = (state) => state.roleApplication.roleApplications;
export const selectedRoleApplcation = (state) => state.roleApplication.selectedRoleApplication;

export const roleApplicationReducer = roleApplicationSlice.reducer;
