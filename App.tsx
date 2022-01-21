import React from 'react';
import { Provider } from 'react-redux';
import { persistor, store } from 'redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';

import RootComponent from './Index';
import Loader from 'components/Loader/Index';
import { themeDefault } from './src/theme/theme-default';

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={themeDefault}>
        <PersistGate loading={<Loader />} persistor={persistor}>
          <RootComponent />
        </PersistGate>
      </ThemeProvider>
    </Provider>
  );
}
