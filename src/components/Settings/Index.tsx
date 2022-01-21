import React from 'react';

import styled from 'styled-components/native';
import { useTheme } from 'styled-components';
import { AntDesign } from '@expo/vector-icons';

const StyledSettingsButton = styled.TouchableOpacity`
  margin: 5px 12px;
`;

export default function SettingsButton() {
  const theme = useTheme();

  return (
    <StyledSettingsButton onPress={() => console.log('settings')}>
      <AntDesign name="setting" size={28} color={theme.colors.secondary} />
    </StyledSettingsButton>
  );
}
