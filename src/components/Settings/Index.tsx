import React from 'react';

import { AntDesign } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { useTheme } from 'styled-components';
import { useNavigationHook } from 'utils/Hooks/useNavigationHook';
import { Screens } from 'typings/enums';

const StyledSettingsButton = styled.TouchableOpacity`
  margin: 5px 12px;
`;

export default function SettingsButton() {
  const theme = useTheme();
  const [navigation] = useNavigationHook(Screens.Home);

  const onPressHandler = () => {
    navigation.navigate(Screens.Settings);
  };

  return (
    <StyledSettingsButton onPress={onPressHandler}>
      <AntDesign name="setting" size={28} color={theme.colors.primary} />
    </StyledSettingsButton>
  );
}
