import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from './userService';

const initialState = {
  users: null,
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Get list users
export const getListUsers = createAsyncThunk(
  'users/getListUsers',
  async (_, thunkAPI) => {
    try {
      return await userService.getListUsers();
    } catch (error: any) {
      const message = error?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user by id
export const getUserById = createAsyncThunk(
  'users/getUserById',
  async (id: string, thunkAPI) => {
    try {
      return await userService.getUserById(id);
    } catch (error: any) {
      let message = error?.message;
      if (error?.response?.status === 404) {
        message = 'User not found!';
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete user by id
export const deleteUserById = createAsyncThunk(
  'users/deleteUserById',
  async (id: string, thunkAPI) => {
    try {
      return await userService.deleteUserById(id);
    } catch (error: any) {
      const message = error?.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    reset: (state: any) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(getListUsers.pending, (state: any) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getListUsers.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload;
      })
      .addCase(getListUsers.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.users = null;
        state.message = action.payload;
      })
      .addCase(getUserById.pending, (state: any) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getUserById.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getUserById.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.message = action.payload;
      })
      .addCase(deleteUserById.pending, (state: any) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(deleteUserById.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        const updatedUsers = state.users.filter(
          (user: any) => user.id !== action.meta.arg
        );
        state.users = updatedUsers;
      })
      .addCase(deleteUserById.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = userSlice.actions;

export default userSlice.reducer;
