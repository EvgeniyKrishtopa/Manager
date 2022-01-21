import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

export default function Loader() {
  const theme = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
      }}
    >
      <ActivityIndicator size="large" color={theme.colors.mainBackgroundColor} />
    </View>
  );
}
