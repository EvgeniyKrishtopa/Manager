import React from 'react';
import { View, Text } from 'react-native';

import { withBackgroundImage } from 'utils/Hocs/withBackgroundImage';

function Home() {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
}

export default withBackgroundImage(Home);
