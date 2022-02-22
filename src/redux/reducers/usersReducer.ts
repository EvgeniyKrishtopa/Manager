import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import firebase from 'services/firebase';
import {
  IUserState,
  IAuthData,
  IUserUpdateDisplayName,
  IUserUploadAvatar,
} from 'typings/interfaces';
import { IsIOS, getPictureBlob } from 'utils/helpers';
import { UserActivities } from 'typings/enums';

const auth = firebase.auth();

const initialState: IUserState = {
  userData: null,
  error: '',
  isLoginnedUser: false,
  imageURL: null,
  typeUserAction: '',
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
  async ({ id, userAvatar }: IUserUploadAvatar, { rejectWithValue }) => {
    try {
      const filename = `${id}-avatar`;
      const uploadUri = IsIOS ? userAvatar.replace('file://', '') : userAvatar;
      let blob;

      const storageRef = firebase.storage().ref(`avatars/${filename}`);
      blob = await getPictureBlob(uploadUri);
      //@ts-ignore
      const snapshot = await storageRef.put(blob);
      //const snapshot = await storageRef.delete(blob)
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
    clearErrorUser: (state) => {
      state.error = '';
    },
    clearTypeUser: (state) => {
      state.typeUserAction = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(SignInAction.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.isLoginnedUser = true;
      state.typeUserAction = '';
      state.error = '';
    });
    builder.addCase(SignInAction.rejected, (state, action) => {
      state.isLoginnedUser = false;
      state.error = 'Rejected!';
    });

    builder.addCase(SignUpAction.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.isLoginnedUser = true;
      state.error = '';
    });
    builder.addCase(SignUpAction.rejected, (state, action) => {
      state.isLoginnedUser = false;
      state.error = 'Rejected!';
    });

    builder.addCase(LogOutAction.fulfilled, (state) => {
      state.userData = null;
      state.isLoginnedUser = false;
      state.error = '';
    });
    builder.addCase(LogOutAction.rejected, (state, action) => {
      state.isLoginnedUser = true;
      state.error = 'Rejected';
    });

    builder.addCase(UpdateUserAction.fulfilled, (state, action) => {
      state.error = '';
      state.userData = action.payload;
      state.typeUserAction = UserActivities.Update;
    });
    builder.addCase(UpdateUserAction.rejected, (state, action) => {
      state.error = 'Rejected';
    });

    builder.addCase(UploadUserImageAction.fulfilled, (state, action) => {
      state.error = '';
      state.imageURL = action.payload;
    });
    builder.addCase(UploadUserImageAction.rejected, (state, action) => {
      state.error = 'Rejected';
    });
  },
});

export const { clearErrorUser, clearTypeUser } = usersSlice.actions;

export default usersSlice.reducer;
