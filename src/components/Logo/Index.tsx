import React from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { useTheme } from 'styled-components';

const StyledLogoHolder = styled.View`
  width: 40px;
  height: 40px;
  margin-left: 12px;
  border: 1px solid ${(props) => props.theme.colors.secondaryTextColor};
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 40px;
  align-items: center;
  justify-content: center;
`;

export default function Logo() {
  const theme = useTheme();

  return (
    <StyledLogoHolder>
      <MaterialCommunityIcons name="pillar" size={28} color={theme.colors.mainTextColor} />
    </StyledLogoHolder>
  );
}
