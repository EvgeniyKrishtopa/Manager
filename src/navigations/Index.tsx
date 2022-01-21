import React from 'react';

import { RootState } from 'redux/store';
import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs/src/types';
import { Fontisto } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import Home from 'modules/Home/Index';
import Articles from 'modules/Articles/Index';
import Contacts from 'modules/Contacts/Index';
import Add from 'modules/Add/Index';
import SignUp from 'modules/Auth/SignUp';
import SignIn from 'modules/Auth/SignIn';
import TabBar from 'components/TabBar/Index';
import LogOutButton from 'components/LogOut/Index';
import SettingsButton from 'components/Settings/Index';
import { Screens } from 'typings/enums';

export type BottomTabStackParamList = {
  Main: undefined;
  Home: undefined;
  Contacts: undefined;
  Articles: undefined;
  Add: undefined;
};

export type AuthStackParamsList = {
  SignIn: undefined;
  SignUp: undefined;
};

const Tab = createBottomTabNavigator<BottomTabStackParamList>();
const Stack = createNativeStackNavigator<AuthStackParamsList>();

const tabBar = (props: BottomTabBarProps) => {
  return <TabBar {...props} />;
};

const TabNavigatorStack = ({ headerOptions }: any) => (
  <Tab.Navigator tabBar={tabBar}>
    <Tab.Screen name={Screens.Main} component={Home} options={headerOptions} />
    <Tab.Screen name={Screens.Contacts} component={Contacts} options={headerOptions} />
    <Tab.Screen name={Screens.Articles} component={Articles} options={headerOptions} />
    <Tab.Screen name={Screens.Add} component={Add} options={headerOptions} />
  </Tab.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name={Screens.SignIn} component={SignIn} options={{ headerShown: false }} />
    <Stack.Screen name={Screens.SignUp} component={SignUp} options={{ headerShown: false }} />
  </Stack.Navigator>
);

export default function RootStack() {
  const { isLoginnedUser } = useSelector((state: RootState) => state.users);
  const theme = useTheme();

  const headerOptions: any = {
    headerStyle: {
      backgroundColor: theme.colors.mainBackgroundColor,
    },
    headerTintColor: theme.colors.primary,
    headerTitle: () => <Fontisto name="onenote" size={40} color={theme.colors.primary} />,
    headerLeft: () => <LogOutButton />,
    headerRight: () => <SettingsButton />,
  };

  return isLoginnedUser ? <TabNavigatorStack headerOptions={headerOptions} /> : <AuthStack />;
}
