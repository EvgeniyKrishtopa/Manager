import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Articles() {
  return (
    <View style={styles.container}>
      <Text>Articles</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
