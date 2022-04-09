import React from 'react';

import { RootState } from 'redux/store';
import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs/src/types';
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators } from '@react-navigation/stack';
import { useTheme } from 'styled-components';
import Home from 'modules/Home/Index';
import Articles from 'modules/Articles/Index';
import FullViewArticle from 'modules/FullViewArticle/Index';
import FullViewContact from 'modules/FullViewContact/Index';
import EditArticle from 'modules/EditArticle/Index';
import EditContact from 'modules/EditContact/Index';
import Contacts from 'modules/Contacts/Index';
import Settings from 'modules/Settings/Index';
import Add from 'modules/Add/Index';
import SignUp from 'modules/Auth/SignUp';
import SignIn from 'modules/Auth/SignIn';
import TabBar from 'components/TabBar/Index';
import Logo from 'components/Logo/Index';
import HeaderRight from 'components/HeaderRight/Index';
import { withNotification } from 'utils/Hocs/withNotification';
import { useGetOrientation } from 'utils/Hooks/useGetOrientation';
import { IsIOS } from 'utils/helpers';
import { Screens } from 'typings/enums';

export type BottomTabStackParamList = {
  Main: undefined;
  Home: undefined;
  Contacts: undefined;
  Articles: undefined;
  FullViewArticle: undefined;
  EditArticle: undefined;
  FullViewContact: undefined;
  EditContact: undefined;
  Add: undefined;
};

export type AuthStackParamsList = {
  SignIn: undefined;
  SignUp: undefined;
};

export type MainStackParamsList = BottomTabStackParamList &
  AuthStackParamsList & { Settings: undefined } & { Authentication: undefined };

const Tab = createBottomTabNavigator<BottomTabStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamsList>();
const MainStack = createNativeStackNavigator<MainStackParamsList>();

const tabBar = (props: BottomTabBarProps) => {
  return <TabBar {...props} />;
};

const TabNavigatorStack = () => {
  const { orientation } = useGetOrientation();
  const theme = useTheme();

  const height = IsIOS && orientation === 'Landscape' ? 60 : 90;

  const headerOptions = {
    headerStyle: {
      backgroundColor: theme.colors.mainBackgroundColor,
      height,
    },
    headerTintColor: theme.colors.primary,
    title: '',
    headerLeft: () => <Logo />,
    headerRight: () => <HeaderRight />,
    cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
  };

  return (
    <Tab.Navigator tabBar={tabBar}>
      <Tab.Screen name={Screens.Main} component={Home} options={headerOptions} />
      <Tab.Screen name={Screens.Contacts} component={Contacts} options={headerOptions} />
      <Tab.Screen name={Screens.Articles} component={Articles} options={headerOptions} />
      <Tab.Screen name={Screens.Add} component={Add} options={headerOptions} />
    </Tab.Navigator>
  );
};

const AuthNavigationStack = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name={Screens.SignIn} component={SignIn} options={{ headerShown: false }} />
    <AuthStack.Screen name={Screens.SignUp} component={SignUp} options={{ headerShown: false }} />
  </AuthStack.Navigator>
);

const MainNavigatorStack = () => {
  const { isLoginnedUser, userData } = useSelector((state: RootState) => state.users);
  const { orientation } = useGetOrientation();
  const theme = useTheme();

  const height = IsIOS && orientation === 'Landscape' ? 60 : 110;

  const optionsSettingsConfig = {
    headerBackVisible: true,
    headerBackTitleVisible: false,
    headerStyle: { backgroundColor: theme.colors.mainBackgroundColor, height },
    headerTintColor: theme.colors.primary,
    cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
  };

  const optionsFullViewConfig = {
    headerBackVisible: true,
    headerBackTitleVisible: false,
    headerRight: () => <HeaderRight isFromFullView={true} />,
    headerStyle: { backgroundColor: theme.colors.mainBackgroundColor, height },
    headerTintColor: theme.colors.primary,
    cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
  };

  return (
    <MainStack.Navigator>
      {isLoginnedUser && userData ? (
        <>
          <MainStack.Screen
            name={Screens.Home}
            component={TabNavigatorStack}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name={Screens.Settings}
            component={Settings}
            options={optionsSettingsConfig}
          />
          <MainStack.Screen
            name={Screens.FullViewArticle}
            component={FullViewArticle}
            options={({ route }) => ({
              //@ts-ignore
              ...{ title: route?.params?.article?.title },
              ...optionsFullViewConfig,
            })}
          />
          <MainStack.Screen
            name={Screens.FullViewContact}
            component={FullViewContact}
            options={({ route }) => ({
              ...{
                //@ts-ignore
                title: `${route?.params?.contact?.firstName} ${route?.params?.contact?.lastName}`,
              },
              ...optionsFullViewConfig,
            })}
          />
          <MainStack.Screen
            name={Screens.EditArticle}
            component={EditArticle}
            options={({ route }) => ({
              //@ts-ignore
              ...{ title: route?.params?.article?.title },
              ...optionsFullViewConfig,
            })}
          />
          <MainStack.Screen
            name={Screens.EditContact}
            component={EditContact}
            options={({ route }) => ({
              ...{
                //@ts-ignore
                title: `${route?.params?.contact?.firstName} ${route?.params?.contact?.lastName}`,
              },
              ...optionsFullViewConfig,
            })}
          />
        </>
      ) : (
        <MainStack.Screen
          name={Screens.Authentication}
          component={AuthNavigationStack}
          options={{ headerShown: false }}
        />
      )}
    </MainStack.Navigator>
  );
};

function RootStack() {
  return (
    <NavigationContainer>
      <MainNavigatorStack />
    </NavigationContainer>
  );
}

export default withNotification(RootStack);
