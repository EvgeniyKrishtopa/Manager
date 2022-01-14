import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainStack } from 'navigations/Index';

type RootStackParamList = {
  App: { headerShown: boolean };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const options = { headerShown: false };

export default function RootComponent() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="App" component={MainStack} options={options} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
