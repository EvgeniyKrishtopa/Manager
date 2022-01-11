import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from 'components/Header/Index';

export default function Auth() {
  return (
    <View style={styles.container}>
      <Header/>
      <Text>Auth2</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
