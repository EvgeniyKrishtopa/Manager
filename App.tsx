import React from 'react';
import { Provider } from 'react-redux';
import { persistor, store } from 'redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from 'styled-components';
import { NavigationContainer } from '@react-navigation/native';

import RootStack from 'navigations/Index';
import Loader from 'components/Loader/Index';
import { theme1 } from './src/theme/theme-default';

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme1}>
        <PersistGate loading={<Loader />} persistor={persistor}>
          <NavigationContainer>
            <RootStack />
          </NavigationContainer>
        </PersistGate>
      </ThemeProvider>
    </Provider>
  );
}
