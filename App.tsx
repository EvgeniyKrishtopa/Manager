import React from 'react';
import { StatusBar } from 'react-native';
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
          <StatusBar backgroundColor="transparent" translucent={true} barStyle="dark-content" />
          <RootComponent />
        </PersistGate>
      </ThemeProvider>
    </Provider>
  );
}
