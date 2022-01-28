import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import firebase from 'services/firebase';
import {
  IUser,
  IAuthData,
  IUserUpdateDisplayName,
  IUserUploadAvatar,
} from 'typings/interfaces';
import { IsIOS, getPictureBlob } from 'utils/helpers';

const auth = firebase.auth();
const db = firebase.firestore().collection('User');

const initialState: IUser = {
  loading: false,
  userData: null,
  error: '',
  isLoginnedUser: false,
  imageURL: null,
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

export const UploadUserImageAction = createAsyncThunk(
  'users/UploadImageAction',
  async (payload: IUserUploadAvatar, { rejectWithValue }) => {
    try {
      const filename = payload.userAvatar.substring(payload.userAvatar.lastIndexOf('/') + 1);
      const uploadUri = IsIOS ? payload.userAvatar.replace('file://', '') : payload.userAvatar;
      let blob;

      const storageRef = firebase.storage().ref(`avatars/${filename}`);
      blob = await getPictureBlob(uploadUri);
      //@ts-ignore
      const snapshot = await storageRef.put(blob);
      return await snapshot.ref.getDownloadURL();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const UpdateUserAction = createAsyncThunk(
  'users/UpdateCurrentUserAction',
  async (payload: IUserUpdateDisplayName, { rejectWithValue }) => {
    try {
      const response = auth.currentUser?.updateProfile({
        displayName: payload.userName,
      });

      if (response) {
        return auth.currentUser;
      }
      return auth.currentUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    checkError: (state) => {
      state.error = '';
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
      state.error = 'Rejected!';
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
      state.error = 'Rejected!';
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
      state.error = 'Rejected';
    });

    builder.addCase(UpdateUserAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(UpdateUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';
      state.userData = action.payload;
    });
    builder.addCase(UpdateUserAction.rejected, (state, action) => {
      state.loading = false;
      state.error = 'Rejected';
    });

    builder.addCase(UploadUserImageAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(UploadUserImageAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';
      state.imageURL = action.payload;
    });
    builder.addCase(UploadUserImageAction.rejected, (state, action) => {
      state.loading = false;
      state.error = 'Rejected';
    });
  },
});

export const { checkError } = usersSlice.actions;

export default usersSlice.reducer;
