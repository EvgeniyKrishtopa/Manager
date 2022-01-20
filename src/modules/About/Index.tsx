import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { WithBackgroundImage } from 'utils/Hocs/withBackgroundImage';

function About() {
  return (
    <View style={styles.container}>
      <Text>About</Text>
    </View>
  );
}

export default WithBackgroundImage(About);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
