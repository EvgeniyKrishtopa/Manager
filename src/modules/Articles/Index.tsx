import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { WithBackgroundImage } from 'utils/Hocs/withBackgroundImage';

function Articles() {
  return (
    <View style={styles.container}>
      <Text>Articles</Text>
    </View>
  );
}

export default WithBackgroundImage(Articles);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
