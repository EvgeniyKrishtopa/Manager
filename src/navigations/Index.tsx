import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs/src/types';

import Home from 'modules/Home/Index';
import About from 'modules/About/Index';
import Articles from 'modules/Articles/Index';
import Contacts from 'modules/Contacts/Index';
import TabBar from 'components/TabBar/Index';

import { Screens } from 'typings/enums';

type StringOption = { title: string };

type BottomTabStackParamList = {
  [Screens.Home]: StringOption;
  [Screens.Contacts]: StringOption;
  [Screens.Articles]: StringOption;
  [Screens.About]: StringOption;
};

const Tab = createBottomTabNavigator<BottomTabStackParamList>();

export function MainStack() {
  function tabBar(props: BottomTabBarProps) {
    return <TabBar {...props} />;
  }

  return (
    <Tab.Navigator tabBar={tabBar}>
      <Tab.Screen name={Screens.Home} component={Home} options={{ title: Screens.Home }} />
      <Tab.Screen
        name={Screens.Contacts}
        component={Contacts}
        options={{ title: Screens.Contacts }}
      />
      <Tab.Screen
        name={Screens.Articles}
        component={Articles}
        options={{ title: Screens.Articles }}
      />
      <Tab.Screen name={Screens.About} component={About} options={{ title: Screens.About }} />
    </Tab.Navigator>
  );
}
