import { useState, useEffect } from 'react';

import * as ScreenOrientation from 'expo-screen-orientation';

const OrientationsList: Array<string> = [
  'UNKNOWN',
  'PORTRAIT_UP',
  'PORTRAIT_DOWN',
  'LANDSCAPE_LEFT',
  'LANDSCAPE_RIGHT',
];

export const useDetectOrientation = () => {
  const [orientation, setOrientation] = useState('PORTRAIT_UP');

  useEffect(() => {
    ScreenOrientation.getOrientationAsync().then((info) => {
      //@ts-ignore
      setOrientation(OrientationsList[info.orientation]);
    });

    const subscription = ScreenOrientation.addOrientationChangeListener((evt) => {
      setOrientation(OrientationsList[evt.orientationInfo.orientation]);
    });

    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, []);

  return { orientation };
};
