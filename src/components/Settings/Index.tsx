import React from 'react';

import { FontAwesome5 } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { useTheme } from 'styled-components';
import { useNavigationHook } from 'utils/Hooks/useNavigationHook';
import { Screens } from 'typings/enums';

const StyledSettingsButton = styled.TouchableOpacity`
  margin: 5px 8px;
`;

export default function SettingsButton() {
  const theme = useTheme();
  const [navigation] = useNavigationHook(Screens.Home);

  const onPressHandler = () => {
    navigation.navigate(Screens.Settings);
  };

  return (
    <StyledSettingsButton onPress={onPressHandler}>
      <FontAwesome5 name="user" size={28} color={theme.colors.primary} />
    </StyledSettingsButton>
  );
}
