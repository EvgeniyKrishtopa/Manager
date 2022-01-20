import React from 'react';
import { View, Text } from 'react-native';

import { WithBackgroundImage } from 'utils/Hocs/withBackgroundImage';

function Home() {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
}

export default WithBackgroundImage(Home);
