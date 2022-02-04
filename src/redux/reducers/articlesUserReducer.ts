import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import firebase from 'services/firebase';
import { IArticleData, IArticleState, IArticleManageData } from 'typings/interfaces';

const db = firebase.firestore().collection('Articles');

interface IFetchAll {
  id: string | undefined;
}

const initialState: IArticleState = {
  articles: null,
  errorArticle: '',
  loadingArticle: false,
};

const getAll = (id: string | undefined) => {
  return db
    .doc(id)
    .collection('Notes')
    .limit(10)
    .orderBy('created', 'asc')
    .get()
    .then((snapshot) => {
      const articles = snapshot.docs.map((item) => {
        const article = item.data();
        article.id = item.id;
        return article;
      });

      return articles;
    });
};

export const FetchArticlesAction = createAsyncThunk(
  'articles/FetchAllArticles',
  async ({ id }: IFetchAll, { rejectWithValue }) => {
    try {
      return getAll(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const AddNewArticleAction = createAsyncThunk(
  'articles/addNewArticle',
  async ({ title, description, id, info }: IArticleData, { rejectWithValue }) => {
    try {
      return db
        .doc(id)
        .collection('Notes')
        .add({
          title,
          description,
          info,
          id,
          created: Date.now(),
        })
        .then(() => {
          return getAll(id);
        });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const DeleteArticleAction = createAsyncThunk(
  'articles/deleteNewArticle',
  async ({ id, userId }: { id: string; userId: string }, { rejectWithValue }) => {
    try {
      return db
        .doc(userId)
        .collection('Notes')
        .doc(id)
        .delete()
        .then(() => {
          return getAll(userId);
        });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const EditArticleAction = createAsyncThunk(
  'articles/EditNewArticle',
  async (
    {
      id,
      title,
      description,
      info,
      userId,
    }: IArticleManageData,
    { rejectWithValue },
  ) => {
    try {
      return db
        .doc(userId)
        .collection('Notes')
        .doc(id)
        .update({
          title,
          description,
          info,
          id,
        })
        .then(() => {
          return getAll(userId);
        });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    checkError: (state) => {
      state.errorArticle = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(AddNewArticleAction.pending, (state) => {
      state.loadingArticle = true;
    });
    builder.addCase(AddNewArticleAction.fulfilled, (state, action) => {
      state.loadingArticle = false;
      state.articles = action.payload;
      state.errorArticle = '';
    });
    builder.addCase(AddNewArticleAction.rejected, (state, action) => {
      state.loadingArticle = false;
      state.errorArticle = 'Rejected!';
    });

    builder.addCase(FetchArticlesAction.fulfilled, (state, action) => {
      state.errorArticle = '';
      state.articles = action.payload;
    });
    builder.addCase(FetchArticlesAction.rejected, (state, action) => {
      state.errorArticle = 'Rejected!';
    });

    builder.addCase(DeleteArticleAction.fulfilled, (state, action) => {
      state.errorArticle = '';
      state.articles = action.payload;
    });
    builder.addCase(DeleteArticleAction.rejected, (state, action) => {
      state.errorArticle = 'Rejected!';
    });

    builder.addCase(EditArticleAction.pending, (state) => {
      state.loadingArticle = true;
    });
    builder.addCase(EditArticleAction.fulfilled, (state, action) => {
      state.errorArticle = '';
      state.loadingArticle = false;
      state.articles = action.payload;
    });
    builder.addCase(EditArticleAction.rejected, (state, action) => {
      state.loadingArticle = false;
      state.errorArticle = 'Rejected!';
    });
  },
});

export const { checkError } = articlesSlice.actions;

export default articlesSlice.reducer;
