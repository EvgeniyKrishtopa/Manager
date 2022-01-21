import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';

import RootStack from 'navigations/Index';

export default function RootComponent() {
  const [fontLoaded, setFontLoaded] = useState<boolean>(false);

  const loadFonts = () => {
    return Font.loadAsync({
      'Montserrat-Thin': require('./assets/fonts/Montserrat-Thin.ttf'),
      'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
      'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
      'WorkSans-Light': require('./assets/fonts/WorkSans-Light.ttf'),
      'WorkSans-Medium': require('./assets/fonts/WorkSans-Medium.ttf'),
      'WorkSans-SemiBold': require('./assets/fonts/WorkSans-SemiBold.ttf'),
    });
  };

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
