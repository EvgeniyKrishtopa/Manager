import React from 'react';
import { TouchableOpacity } from 'react-native';

import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs/src/types';
import { Screens } from 'typings/enums';
import { useTheme } from 'styled-components';

const StyledView = styled.View`
  flex-direction: row;
  background-color: ${(props) => props.theme.colors.mainBackgroundColor};
  align-items: center;
  justify-content: space-between;
  padding: 10px 40px 15px;
  border-top-width: 0.5px;
  border-style: solid;
  border-color: ${(props) => props.theme.colors.primary};
`;

export default function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const theme = useTheme();

  const renderIcon = (screen: string, focused: boolean) => {
    const iconColor = focused ? theme.colors.primary : theme.colors.secondary;

    switch (screen) {
      case Screens.Main:
        return <Ionicons name="md-home" size={32} color={iconColor} />;
      case Screens.Contacts:
        return <Ionicons name="list" size={35} color={iconColor} />;
      case Screens.Articles:
        return <Ionicons name="md-newspaper" size={32} color={iconColor} />;
      case Screens.Add:
        return <Ionicons name="add-circle-outline" size={32} color={iconColor} />;
    }
  };

  const onTabPress = (route: { name: string; key: string }) => {
    navigation.navigate(route.name);
  };

  return (
    <StyledView>
      {state.routes.map((route: { name: string; key: string }, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        return (
          <TouchableOpacity
            key={route.key}
            activeOpacity={0.7}
            accessibilityRole="button"
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={() => onTabPress(route)}
          >
            {renderIcon(route.name, isFocused)}
          </TouchableOpacity>
        );
      })}
    </StyledView>
  );
}
