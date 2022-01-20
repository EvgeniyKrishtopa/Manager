import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { Screens } from 'typings/enums';
import {
  BottomTabStackParamList,
  AuthStackParamsList,
  DrawerStackParamsList,
} from 'navigations/Index';

type ScreensType = keyof typeof Screens;

export const useNavigationHook = (screen: ScreensType) => {
  type SignInScreenNavigationProp = StackNavigationProp<
    BottomTabStackParamList & AuthStackParamsList & DrawerStackParamsList,
    typeof screen
  >;

  const navigation = useNavigation<SignInScreenNavigationProp>();

  return [navigation];
};
