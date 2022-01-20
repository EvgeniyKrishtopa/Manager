import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './reducers/usersReducer';
import { combineReducers } from 'redux';
import {
  persistStore,
  persistReducer,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
};

const reducers = combineReducers({
  users: usersReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers )

export const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
});

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
