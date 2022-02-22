import React from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { useTheme } from 'styled-components';
import { IsIOS, getDimensions } from 'utils/helpers';

const { windowWidth } = getDimensions();

const StyledLogoHolder = styled.View`
  width: 50px;
  height: 50px;
  margin-top: ${IsIOS ? '-10px' : '0px'};
  border: 1px solid ${(props) => props.theme.colors.secondaryTextColor};
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: ${windowWidth / 3.8};
`;

export default function Logo() {
  const theme = useTheme();
  return (
    <StyledLogoHolder>
      <MaterialCommunityIcons name="pillar" size={38} color={theme.colors.mainTextColor} />
    </StyledLogoHolder>
  );
}
