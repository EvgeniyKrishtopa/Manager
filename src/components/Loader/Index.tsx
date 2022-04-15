import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

interface IPropsColor {
  color?: string;
  size?: any;
}

export default function Loader({ color, size = 'large' }: IPropsColor) {
  const theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
      }}
    >
      <ActivityIndicator size={size} color={color ? color : theme.colors.mainBackgroundColor} />
    </View>
  );
}
