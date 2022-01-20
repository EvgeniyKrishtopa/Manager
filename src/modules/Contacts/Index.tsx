import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { WithBackgroundImage } from 'utils/Hocs/withBackgroundImage';

function Contacts() {
  return (
    <View style={styles.container}>
      <Text>Contacts</Text>
    </View>
  );
}

export default WithBackgroundImage(Contacts);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
