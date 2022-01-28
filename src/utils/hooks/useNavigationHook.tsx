import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { Screens } from 'typings/enums';
import { MainStackParamsList } from 'navigations/Index';

type ScreensType = keyof typeof Screens;

export const useNavigationHook = (screen: ScreensType) => {
  type ScreenNavigationProp = StackNavigationProp<MainStackParamsList, typeof screen>;

  const navigation = useNavigation<ScreenNavigationProp>();

  return [navigation];
};
