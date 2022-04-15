import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import firebase from 'services/firebase';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import { IContactState, ICreateContactData, IUserUploadAvatar } from 'typings/interfaces';
import { ManageActivities } from 'typings/enums';
import { getPictureBlob, IsIOS, uidCleaner } from 'utils/helpers';

const db = firebase.firestore().collection('Contacts');
interface IFetchAll {
  id: string | undefined;
  urls?: Array<string>;
}

const initialState: IContactState = {
  contacts: null,
  errorContact: '',
  avatars: [],
  typeContactAction: '',
  isLoadingContact: true,
};

const getAll = ({ id, urls }: IFetchAll) => {
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

      if (urls) {
        const avatars = contacts.map((contact) => {
          const url = urls.find((u) => {
            const formattedId = uidCleaner(contact.id);
            return u.includes(formattedId);
          });

          return { link: url, id: contact.id as string };
        });

        return {
          contacts: contacts as Array<ICreateContactData>,
          avatars,
        };
      }

      return { contacts: contacts as Array<ICreateContactData> };
    });
};

export const FetchContactsAction = createAsyncThunk(
  'articles/FetchAllContacts',
  async ({ id }: IFetchAll, { rejectWithValue }) => {
    try {
      const fetchImages = async () => {
        const contactsUrls = await firebase.storage().ref().child('contacts').listAll();
        const contactsUrlPromises = contactsUrls.items.map((imageRef) => imageRef.getDownloadURL());

        return Promise.all(contactsUrlPromises);
      };

      const loadImages = () => {
        const urls = fetchImages();
        return urls;
      };

      const res = loadImages();

      return res.then((urls) => {
        return getAll({ id, urls });
      });
    } catch (error) {
      return rejectWithValue(error);
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
      return rejectWithValue(error);
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
      return rejectWithValue(error);
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
      return rejectWithValue(error);
    }
  },
);

export const UploadContactImageAction = createAsyncThunk(
  'contacts/UploadImageAction',
  async ({ id, userAvatar, avatarId }: IUserUploadAvatar, { rejectWithValue }) => {
    try {
      const filename = `${avatarId}avatar`;
      const uploadUri = IsIOS ? userAvatar.replace('file://', '') : userAvatar;
      const storageRef = firebase.storage().ref(`contacts/${filename}`);
      const blob = await getPictureBlob(uploadUri);
      //@ts-ignore
      const snapshot = await storageRef.put(blob);
      const link = await snapshot.ref.getDownloadURL();

      const result = {
        link,
        id,
      };

      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const DeleteContactImageAction = createAsyncThunk(
  'contacts/DeleteImageAction',
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const storage = getStorage();
      const filename = uidCleaner(id);
      const desertRef = ref(storage, `contacts/${filename}avatar`);

      await deleteObject(desertRef)
        .then(() => {
          console.log('Success!!');
        })
        .catch((error) => {
          console.log(error);
        });
      return id;
    } catch (error) {
      return rejectWithValue(error);
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
    clearLoadingContact: (state) => {
      state.isLoadingContact = true;
    },
    clearContacts: (state) => {
      state.contacts = null;
      state.avatars = [];
    },
  },

  extraReducers: (builder) => {
    builder.addCase(AddNewContactAction.pending, (state) => {
      state.isLoadingContact = true;
    });
    builder.addCase(AddNewContactAction.fulfilled, (state, action) => {
      state.contacts = action.payload.contacts;
      state.errorContact = '';
      state.typeContactAction = ManageActivities.Add;
      state.isLoadingContact = false;
    });
    builder.addCase(AddNewContactAction.rejected, (state) => {
      state.errorContact = 'Rejected!';
      state.isLoadingContact = false;
    });

    builder.addCase(FetchContactsAction.fulfilled, (state, action) => {
      state.errorContact = '';
      state.contacts = action.payload.contacts;
      state.typeContactAction = '';

      if (action.payload.avatars) {
        state.avatars = action.payload.avatars;
      }
    });

    builder.addCase(FetchContactsAction.rejected, (state) => {
      state.errorContact = 'Rejected!';
    });

    builder.addCase(DeleteContactAction.fulfilled, (state, action) => {
      state.errorContact = '';
      state.contacts = action.payload.contacts;
      state.typeContactAction = ManageActivities.Delete;
    });
    builder.addCase(DeleteContactAction.rejected, (state) => {
      state.errorContact = 'Rejected!';
    });

    builder.addCase(EditContactAction.pending, (state) => {
      state.isLoadingContact = true;
    });

    builder.addCase(EditContactAction.fulfilled, (state, action) => {
      state.errorContact = '';
      state.isLoadingContact = false;
      state.contacts = action.payload.contacts;
      state.typeContactAction = ManageActivities.Edit;
    });
    builder.addCase(EditContactAction.rejected, (state) => {
      state.isLoadingContact = false;
      state.errorContact = 'Rejected!';
    });

    builder.addCase(UploadContactImageAction.fulfilled, (state, action) => {
      let currentAvatars = state.avatars;
      const isAvatarExist = currentAvatars.find((item) => item.id === action.payload.id);
      if (isAvatarExist) {
        currentAvatars = currentAvatars.map((item) => {
          if (item.id === action.payload.id) {
            return {
              link: action.payload.link,
              id: item.id,
            };
          } else {
            return item;
          }
        });
      } else {
        currentAvatars.push(action.payload);
      }

      state.isLoadingContact = false;
      state.avatars = currentAvatars;
      state.errorContact = '';
      state.isLoadingContact = false;
    });

    builder.addCase(UploadContactImageAction.rejected, (state) => {
      state.errorContact = 'Rejected';
      state.isLoadingContact = false;
    });

    builder.addCase(DeleteContactImageAction.fulfilled, (state, action) => {
      state.errorContact = '';
      state.avatars = state.avatars.filter((item) => item.id !== action.payload);
    });
    builder.addCase(DeleteContactImageAction.rejected, (state) => {
      state.errorContact = 'Rejected';
    });
  },
});

export const { clearErrorContact, clearTypeContact, clearLoadingContact, clearContacts } =
  contactsSlice.actions;

export default contactsSlice.reducer;
