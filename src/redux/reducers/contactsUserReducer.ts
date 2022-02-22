import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import firebase from 'services/firebase';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import {
  IContactState,
  ICreateContactData,
  IUserUploadAvatar,
} from 'typings/interfaces';
import { ManageActivities } from 'typings/enums';
import { getPictureBlob, IsIOS, uidCleaner } from 'utils/helpers';

const db = firebase.firestore().collection('Contacts');

interface IFetchAll {
  id: string | undefined;
}

const initialState: IContactState = {
  contacts: null,
  errorContact: '',
  avatars: [],
  typeContactAction: '',
  isLoading: true,
};

const getAll = ({ id }: IFetchAll) => {
  return db
    .doc(id)
    .collection('ContactsList')
    .limit(10)
    .orderBy('created', 'desc')
    .get()
    .then((snapshot) => {
      const contacts = snapshot.docs.map((item) => {
        const contact = item.data();
        contact.id = item.id;
        return contact;
      });
      return contacts as Array<ICreateContactData>;
    });
};

export const FetchContactsAction = createAsyncThunk(
  'articles/FetchAllContacts',
  async ({ id }: IFetchAll, { rejectWithValue }) => {
    try {
      return getAll({ id });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const AddNewContactAction = createAsyncThunk(
  'contacts/addNewContact',
  async (
    {
      id,
      firstName,
      lastName,
      email,
      occupation,
      phoneNumber,
      birthDay,
      location,
      webSite,
      docId,
    }: ICreateContactData,
    { rejectWithValue },
  ) => {
    try {
      return db
        .doc(id)
        .collection('ContactsList')
        .doc(docId)
        .set({
          firstName,
          lastName,
          email,
          occupation,
          phoneNumber,
          birthDay,
          location,
          webSite,
          created: Date.now(),
        })
        .then(() => {
          return getAll({ id });
        });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const DeleteContactAction = createAsyncThunk(
  'contacts/deleteNewContact',
  async ({ id, userId }: { id: string; userId: string }, { rejectWithValue }) => {
    try {
      return db
        .doc(userId)
        .collection('ContactsList')
        .doc(id)
        .delete()
        .then(() => {
          return getAll({ id: userId });
        });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const EditContactAction = createAsyncThunk(
  'contacts/EditNewContact',
  async (
    {
      firstName,
      lastName,
      email,
      occupation,
      phoneNumber,
      birthDay,
      location,
      webSite,
      id,
      userId,
    }: ICreateContactData,
    { rejectWithValue },
  ) => {
    try {
      return db
        .doc(userId)
        .collection('ContactsList')
        .doc(id)
        .update({
          firstName,
          lastName,
          email,
          occupation,
          phoneNumber,
          birthDay,
          location,
          webSite,
        })
        .then(() => {
          return getAll({ id: userId });
        });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const UploadContactImageAction = createAsyncThunk(
  'contacts/UploadImageAction',
  async ({ id, userAvatar, avatarId }: IUserUploadAvatar, { rejectWithValue }) => {
    try {
      let filename = `${avatarId}avatar`;
      const uploadUri = IsIOS ? userAvatar.replace('file://', '') : userAvatar;
      let blob;

      const storageRef = firebase.storage().ref(`contacts/${filename}`);
      blob = await getPictureBlob(uploadUri);
      //@ts-ignore
      const snapshot = await storageRef.put(blob);
      const link = await snapshot.ref.getDownloadURL();
      const result = {
        link,
        id,
      };
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const DeleteContactImageAction = createAsyncThunk(
  'contacts/DeleteImageAction',
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const storage = getStorage();
      const filename = uidCleaner(id);
      // Create a reference to the file to delete
      const desertRef = ref(storage, `contacts/${filename}avatar`);

      // Delete the file
      deleteObject(desertRef)
        .then(() => {
          console.log('Success!!');
        })
        .catch((error) => {
          console.log(error);
        });
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    clearErrorContact: (state) => {
      state.errorContact = '';
    },
    clearTypeContact: (state) => {
      state.typeContactAction = '';
    },
    clearLoading: (state) => {
      state.isLoading = true;
    },
  },

  
  extraReducers: (builder) => {
    builder.addCase(AddNewContactAction.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(AddNewContactAction.fulfilled, (state, action) => {
      state.contacts = action.payload;
      state.errorContact = '';
      state.typeContactAction = ManageActivities.Add;
      state.isLoading = false;
    });
    builder.addCase(AddNewContactAction.rejected, (state, action) => {
      state.errorContact = 'Rejected!';
      state.isLoading = false;
    });

    builder.addCase(FetchContactsAction.fulfilled, (state, action) => {
      state.errorContact = '';
      state.contacts = action.payload;
      state.typeContactAction = '';
    });
    builder.addCase(FetchContactsAction.rejected, (state, action) => {
      state.errorContact = 'Rejected!';
    });

    builder.addCase(DeleteContactAction.fulfilled, (state, action) => {
      state.errorContact = '';
      state.contacts = action.payload;
      state.typeContactAction = ManageActivities.Delete;
    });
    builder.addCase(DeleteContactAction.rejected, (state, action) => {
      state.errorContact = 'Rejected!';
    });

    builder.addCase(EditContactAction.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(EditContactAction.fulfilled, (state, action) => {
      state.errorContact = '';
      state.isLoading = false;
      state.contacts = action.payload;
      state.typeContactAction = ManageActivities.Edit;
    });
    builder.addCase(EditContactAction.rejected, (state, action) => {
      state.isLoading = false;
      state.errorContact = 'Rejected!';
    });

    builder.addCase(UploadContactImageAction.fulfilled, (state, action) => {
      const currentAvatars = state.avatars;
      currentAvatars.push(action.payload);

      state.avatars = currentAvatars;
      state.errorContact = '';
      state.isLoading = false;
    });
    builder.addCase(UploadContactImageAction.rejected, (state, action) => {
      state.errorContact = 'Rejected';
      state.isLoading = false;
    });

    builder.addCase(DeleteContactImageAction.fulfilled, (state, action) => {
      state.errorContact = '';
      state.avatars = state.avatars.filter((item) => item.id !== action.payload);
    });
    builder.addCase(DeleteContactImageAction.rejected, (state, action) => {
      state.errorContact = 'Rejected';
    });
  },
});

export const { clearErrorContact, clearTypeContact, clearLoading } = contactsSlice.actions;

export default contactsSlice.reducer;
