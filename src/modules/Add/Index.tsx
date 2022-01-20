import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { WithBackgroundImage } from 'utils/Hocs/withBackgroundImage';

function Add() {
  return (
    <View style={styles.container}>
      <Text>Add</Text>
    </View>
  );
}

export default WithBackgroundImage(Add);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
