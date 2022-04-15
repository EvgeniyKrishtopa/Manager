import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import firebase from 'services/firebase';
import {
  IArticleData,
  IArticleState,
  IArticleManageData,
  IDeleteArticleData,
} from 'typings/interfaces';
import { ArticleEditType } from 'modules/FullViewArticle/Index';
import { ManageActivities } from 'typings/enums';

const db = firebase.firestore().collection('Articles');

interface IFetchAll {
  id: string | undefined;
}

const initialState: IArticleState = {
  articles: null,
  errorArticle: '',
  typeArticleAction: '',
  isLoadingArticle: true,
};

const getAll = ({ id }: IFetchAll) => {
  return db
    .doc(id)
    .collection('Notes')
    .limit(10)
    .orderBy('created', 'desc')
    .get()
    .then((snapshot) => {
      const articles = snapshot.docs.map((item) => {
        const article = item.data();
        article.id = item.id;
        return article;
      });

      return articles as Array<IArticleManageData>;
    });
};

export const FetchArticlesAction = createAsyncThunk(
  'articles/FetchAllArticles',
  async ({ id }: IFetchAll, { rejectWithValue }) => {
    try {
      return getAll({ id });
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const AddNewArticleAction = createAsyncThunk(
  'articles/addNewArticle',
  async ({ title, description, id, info, userId }: IArticleData, { rejectWithValue }) => {
    try {
      return db
        .doc(userId)
        .collection('Notes')
        .doc(id)
        .set({
          title,
          description,
          info,
          created: Date.now(),
        })
        .then(() => {
          return getAll({ id: userId });
        });
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const DeleteArticleAction = createAsyncThunk(
  'articles/deleteNewArticle',
  async ({ id, userId }: IDeleteArticleData, { rejectWithValue }) => {
    try {
      return db
        .doc(userId)
        .collection('Notes')
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

export const EditArticleAction = createAsyncThunk(
  'articles/EditNewArticle',
  async ({ id, title, description, info, userId }: ArticleEditType, { rejectWithValue }) => {
    try {
      return db
        .doc(userId)
        .collection('Notes')
        .doc(id)
        .update({
          title,
          description,
          info,
        })
        .then(() => {
          return getAll({ id: userId });
        });
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    clearErrorArticle: (state) => {
      state.errorArticle = '';
    },
    clearTypeArticle: (state) => {
      state.typeArticleAction = '';
    },
    clearLoadingArticle: (state) => {
      state.isLoadingArticle = true;
    },
    clearArticles: (state) => {
      state.articles = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(FetchArticlesAction.fulfilled, (state, action) => {
      state.errorArticle = '';
      state.articles = action.payload;
    });
    builder.addCase(FetchArticlesAction.rejected, (state) => {
      state.errorArticle = 'Rejected!';
    });

    builder.addCase(AddNewArticleAction.pending, (state) => {
      state.isLoadingArticle = true;
    });
    builder.addCase(AddNewArticleAction.fulfilled, (state, action) => {
      state.typeArticleAction = ManageActivities.Add;
      state.articles = action.payload;
      state.errorArticle = '';
      state.isLoadingArticle = false;
    });
    builder.addCase(AddNewArticleAction.rejected, (state) => {
      state.errorArticle = 'Rejected!';
      state.isLoadingArticle = true;
    });

    builder.addCase(DeleteArticleAction.fulfilled, (state, action) => {
      state.errorArticle = '';
      state.typeArticleAction = ManageActivities.Delete;
      state.articles = action.payload;
    });
    builder.addCase(DeleteArticleAction.rejected, (state) => {
      state.errorArticle = 'Rejected!';
    });

    builder.addCase(EditArticleAction.pending, (state) => {
      state.isLoadingArticle = true;
    });
    builder.addCase(EditArticleAction.fulfilled, (state, action) => {
      state.errorArticle = '';
      state.articles = action.payload;
      state.typeArticleAction = ManageActivities.Edit;
      state.isLoadingArticle = false;
    });
    builder.addCase(EditArticleAction.rejected, (state) => {
      state.errorArticle = 'Rejected!';
      state.isLoadingArticle = true;
    });
  },
});

export const { clearErrorArticle, clearTypeArticle, clearLoadingArticle, clearArticles } =
  articlesSlice.actions;

export default articlesSlice.reducer;
