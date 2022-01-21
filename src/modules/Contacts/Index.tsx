import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { withBackgroundImage } from 'utils/Hocs/withBackgroundImage';

function Contacts() {
  return (
    <View style={styles.container}>
      <Text>Contacts</Text>
    </View>
  );
}

export default withBackgroundImage(Contacts);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
