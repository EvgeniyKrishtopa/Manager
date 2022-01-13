import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Contacts() {
  return (
    <View style={styles.container}>
      <Text>Contacts</Text>
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
