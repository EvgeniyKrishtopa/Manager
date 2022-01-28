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

const StyledTabHolder = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledText = styled.Text<{ focused: boolean }>`
  font-size: 14px;
  font-family: ${(props) => props.theme.fonts.primaryMedium}
  color: ${(props) =>
    props.focused ? props.theme.colors.primary : props.theme.colors.mainTextColor};
`;

export default function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const theme = useTheme();

  const renderTab = (screen: string, focused: boolean) => {
    const iconColor = focused ? theme.colors.primary : theme.colors.mainTextColor;

    switch (screen) {
      case Screens.Main:
        return (
          <StyledTabHolder>
            <Ionicons name="md-home" size={26} color={iconColor} />
            <StyledText focused={focused}>{Screens.Home}</StyledText>
          </StyledTabHolder>
        );
      case Screens.Contacts:
        return (
          <StyledTabHolder>
            <Ionicons name="list" size={26} color={iconColor} />
            <StyledText focused={focused}>{Screens.Contacts}</StyledText>
          </StyledTabHolder>
        );
      case Screens.Articles:
        return (
          <StyledTabHolder>
            <Ionicons name="md-newspaper" size={26} color={iconColor} />
            <StyledText focused={focused}>{Screens.Articles}</StyledText>
          </StyledTabHolder>
        );
      case Screens.Add:
        return (
          <StyledTabHolder>
            <Ionicons name="add-circle-outline" size={26} color={iconColor} />
            <StyledText focused={focused}>{Screens.Add}</StyledText>
          </StyledTabHolder>
        );
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
            {renderTab(route.name, isFocused)}
          </TouchableOpacity>
        );
      })}
    </StyledView>
  );
}
