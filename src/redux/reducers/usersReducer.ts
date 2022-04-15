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
  imageURL: undefined,
  typeUserAction: '',
  orientation: 'PORTRAIT_UP',
};

export const SignInAction = createAsyncThunk(
  'users/signInAction',
  // eslint-disable-next-line @typescript-eslint/require-await
  async (payload: IAuthData, { rejectWithValue }) => {
    try {
      const response = auth.signInWithEmailAndPassword(payload.email, payload.password);
      const fetchImages = async () => {
        const avatars = await firebase.storage().ref().child('avatars').listAll();
        const avatarsUrlPromises = avatars.items.map((imageRef) => imageRef.getDownloadURL());

        return Promise.all(avatarsUrlPromises);
      };

      const loadImages = async () => {
        const urls = await fetchImages();
        const id = (await response).user?.uid;

        if (id) {
          const avatar = urls.find((item) => item.includes(id));
          return {
            user: (await response).user,
            avatarUrl: avatar,
          };
        }
      };

      const authData = loadImages();
      return authData;
    } catch (error) {
      return rejectWithValue(error);
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
      return rejectWithValue(error);
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
      return rejectWithValue(error);
    }
  },
);

export const UploadUserImageAction = createAsyncThunk(
  'users/UploadImageAction',
  async (
    { id, userAvatar, isOnlyImageUpdated = false }: IUserUploadAvatar,
    { rejectWithValue },
  ) => {
    try {
      const filename = `${id}-avatar`;
      const uploadUri = IsIOS ? userAvatar.replace('file://', '') : userAvatar;
      const storageRef = firebase.storage().ref(`avatars/${filename}`);
      const blob = await getPictureBlob(uploadUri);
      //@ts-ignore
      const snapshot = await storageRef.put(blob);
      const result = {
        image: await snapshot.ref.getDownloadURL(),
        isOnlyImageUpdated,
      };

      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const UpdateUserAction = createAsyncThunk(
  'users/UpdateCurrentUserAction',
  async (payload: IUserUpdateDisplayName, { rejectWithValue }) => {
    try {
      const response = await auth.currentUser?.updateProfile({
        displayName: payload.userName,
      });

      if (response) {
        return auth.currentUser;
      }
      return auth.currentUser;
    } catch (error) {
      return rejectWithValue(error);
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
    changeOrientation: (state, action) => {
      state.orientation = action.payload;
    },
    clearAvatarUser: (state) => {
      state.imageURL = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(SignInAction.fulfilled, (state, action) => {
      state.userData = action.payload?.user;
      state.isLoginnedUser = true;
      state.typeUserAction = '';
      state.error = '';

      if (!state.imageURL) {
        state.imageURL = action.payload?.avatarUrl;
      }
    });
    builder.addCase(SignInAction.rejected, (state) => {
      state.isLoginnedUser = false;
      state.error = 'Rejected!';
    });

    builder.addCase(SignUpAction.fulfilled, (state, action) => {
      state.userData = action.payload;
      state.isLoginnedUser = true;
      state.error = '';
    });
    builder.addCase(SignUpAction.rejected, (state) => {
      state.isLoginnedUser = false;
      state.error = 'Rejected!';
    });

    builder.addCase(LogOutAction.fulfilled, (state) => {
      state.userData = null;
      state.isLoginnedUser = false;
      state.error = '';
    });

    builder.addCase(LogOutAction.rejected, (state) => {
      state.isLoginnedUser = true;
      state.error = 'Rejected';
    });

    builder.addCase(UpdateUserAction.fulfilled, (state, action) => {
      state.error = '';
      state.userData = action.payload;
      state.typeUserAction = UserActivities.Update;
    });
    builder.addCase(UpdateUserAction.rejected, (state) => {
      state.error = 'Rejected';
    });

    builder.addCase(UploadUserImageAction.fulfilled, (state, action) => {
      state.error = '';
      state.imageURL = action.payload.image;

      if (action.payload.isOnlyImageUpdated) {
        state.typeUserAction = UserActivities.Update;
      }
    });
    builder.addCase(UploadUserImageAction.rejected, (state) => {
      state.error = 'Rejected';
    });
  },
});

export const { clearErrorUser, clearTypeUser, changeOrientation, clearAvatarUser } =
  usersSlice.actions;

export default usersSlice.reducer;
