import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from './../axios';

const initialState = {
  comments: [],
  loading: false,
  comment: '',
  user: '',
  error: null,
};

export const getCommentById = createAsyncThunk(
  'comments/getCommentById',
  async (commentId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/comments/${commentId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
export const getAllComments = createAsyncThunk('comments/getAllComments', async () => {
  try {
    const response = await axios.get(`/commentsAll`);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});
export const createComment = createAsyncThunk(
  'comments/create',
  async (commentData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/comments', commentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const getCommentsByTarget = createAsyncThunk(
  'comments/getByTarget',
  async (targetData, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/comments/${targetData.target}/${targetData.targetId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const fetchUserByIdForComment = createAsyncThunk(
  '/auth/fetchUserByIdForComment',
  async (id) => {
    const { data } = await axios.get(`/auth/${id}`);
    return data;
  },
);

export const updateLikes = createAsyncThunk(
  'comments/updateLikes',
  async (commentId, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/comments/likes/${commentId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/commentRemove?id=${commentId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.push(action.payload);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCommentsByTarget.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCommentsByTarget.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(getCommentsByTarget.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateLikes.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateLikes.fulfilled, (state, action) => {
        state.loading = false;
        // Update the likes for the specific comment in the state
        state.comments = state.comments.map((comment) => {
          if (comment._id === action.payload._id) {
            return action.payload;
          }
          return comment;
        });
      })
      .addCase(updateLikes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(fetchUserByIdForComment.fulfilled, (state, action) => {
        state.status = 'success';
        state.user = action.payload;
      })
      .addCase(fetchUserByIdForComment.pending, (state, action) => {
        state.status = 'loading';
        state.user = null;
      })
      .addCase(fetchUserByIdForComment.rejected, (state, action) => {
        state.status = 'error';
        state.user = null;
      });
    builder
      .addCase(getCommentById.fulfilled, (state, action) => {
        state.status = 'success';
        state.comment = action.payload;
      })
      .addCase(getCommentById.pending, (state, action) => {
        state.status = 'loading';
        state.comment = null;
      })
      .addCase(getCommentById.rejected, (state, action) => {
        state.status = 'error';
        state.comment = null;
      });
    builder
      .addCase(getAllComments.fulfilled, (state, action) => {
        state.status = 'success';
        state.comments = action.payload;
      })
      .addCase(getAllComments.pending, (state, action) => {
        state.status = 'loading';
        state.comments = [];
      })
      .addCase(getAllComments.rejected, (state, action) => {
        state.status = 'error';
        state.comments = null;
      });
    builder
      .addCase(deleteComment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.status = 'success';
      })
      .addCase(deleteComment.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const selectComments = (state) => state.comment.comments;
export const selectComment = (state) => state.comment.comment;
export const selectCommentStatus = (state) => state.comment.status;
export default commentsSlice.reducer;
