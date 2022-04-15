import { useEffect } from 'react';

import { useSharedValue, withTiming, Easing, useAnimatedStyle } from 'react-native-reanimated';

export const useListAnimate = (index: number | undefined) => {
  const opacityArticle = useSharedValue(0);

  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const style = useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacityArticle.value, config),
    };
  });

  useEffect(() => {
    let time;

    if (!index) {
      time = 200;
    } else if (index > 0) {
      time = 200 * (index + 1);
    }

    setTimeout(() => {
      opacityArticle.value = 1;
    }, time);
  }, [opacityArticle, index]);

  return style;
};
