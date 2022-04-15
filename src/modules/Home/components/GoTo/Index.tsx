import React from 'react';

import styled from 'styled-components/native';
import { StyledButtonPrimary, StyledButtonTextPrimary } from 'components/Styled/Index';

interface IGoTo {
  onNavigateHandler: () => void;
}

const StyledButtonWrapper = styled.View`
  padding: 10px 20px;
  align-items: center;
`;

export default function GoTo({ onNavigateHandler }: IGoTo) {
  return (
    <StyledButtonWrapper>
      <StyledButtonPrimary onPress={onNavigateHandler}>
        <StyledButtonTextPrimary>Create a new Article/Contact</StyledButtonTextPrimary>
      </StyledButtonPrimary>
    </StyledButtonWrapper>
  );
}
