import React from 'react';
import { Provider } from 'react-redux';
import { persistor, store } from 'redux/store';
import { PersistGate } from 'redux-persist/integration/react';

import firebase from 'services/firebase';

import RootComponent from './src/Index';
import Loader from 'components/Loader/Index';

export default function App() {
  const auth = firebase.auth();

  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <RootComponent />
      </PersistGate>
    </Provider>
  );
}
