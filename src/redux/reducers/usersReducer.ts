import { createSlice} from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import firebase from 'services/firebase';

import {IUser, IAuthData} from 'typings/interfaces';

const auth = firebase.auth();

const initialState: IUser = {
  loading: false,
  userData: null,
  error: '',
  isLoginnedUser: false,
};

export const SignInAction = createAsyncThunk(
  'users/signInAction',
  async (payload: IAuthData, { rejectWithValue }) => {
    try {
      const response = auth.signInWithEmailAndPassword(payload.email, payload.password);
      return (await response).user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const SignUpAction = createAsyncThunk(
  'users/signUpAction',
  async (payload: IAuthData, { rejectWithValue }) => {
    try {
      const response = auth.createUserWithEmailAndPassword(payload.email, payload.password);
      return (await response).user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const LogOutAction = createAsyncThunk(
  'users/LogOutAction',
  async (_, { rejectWithValue }) => {
    try {
      const response = auth.signOut();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    checkError: state => {
      state.error = ''
    },
  },
  extraReducers: (builder) => {
    builder.addCase(SignInAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(SignInAction.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.isLoginnedUser = true;
      state.loading = false;
      state.error = '';
    });
    builder.addCase(SignInAction.rejected, (state, action) => {
      state.loading = false;
      state.isLoginnedUser = false;
      state.error = action.error.message;
    });

    builder.addCase(SignUpAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(SignUpAction.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.isLoginnedUser = true;
      state.loading = false;
      state.error = '';
    });
    builder.addCase(SignUpAction.rejected, (state, action) => {
      state.loading = false;
      state.isLoginnedUser = false;
      state.error = action.error.message;
    });

    builder.addCase(LogOutAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(LogOutAction.fulfilled, (state) => {
      state.userData = null;
      state.isLoginnedUser = false;
      state.loading = false;
      state.error = '';
    });
    builder.addCase(LogOutAction.rejected, (state, action) => {
      state.loading = false;
      state.isLoginnedUser = true;
      state.error = action.error.message;
    });
  },
});

export const { checkError } = usersSlice.actions

export default usersSlice.reducer;
