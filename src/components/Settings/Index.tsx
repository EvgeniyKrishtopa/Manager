import React from 'react';

import styled from 'styled-components/native';

import { AntDesign } from '@expo/vector-icons';

const StyledSettingsButton = styled.TouchableOpacity`
  margin: 5px 12px;
`;

export default function SettingsButton() {
  return (
    <StyledSettingsButton onPress={() => console.log('settings')}>
      <AntDesign name="setting" size={28} color="#B762C1" />
    </StyledSettingsButton>
  );
}
