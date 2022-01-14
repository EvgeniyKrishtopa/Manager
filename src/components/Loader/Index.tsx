import React from 'react';
import { View, ActivityIndicator } from 'react-native';

export default function Loader() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
      }}
    >
      <ActivityIndicator size="large" color="#4FBDBA" />
    </View>
  );
}
