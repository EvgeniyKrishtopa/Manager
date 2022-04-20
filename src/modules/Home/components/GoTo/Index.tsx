import React from 'react';

import styled from 'styled-components/native';
import { StyledButtonPrimary, StyledButtonTextPrimary } from 'components/Styled/Index';
import { useLanguage } from 'utils/Hooks/useLanguage';
import { TranslationInfo } from 'typings/enums';
interface IGoTo {
  onNavigateHandler: () => void;
}

const StyledButtonWrapper = styled.View`
  padding: 10px 20px;
  align-items: center;
`;

export default function GoTo({ onNavigateHandler }: IGoTo) {
  const i18n = useLanguage();

  return (
    <StyledButtonWrapper>
      <StyledButtonPrimary onPress={onNavigateHandler}>
        <StyledButtonTextPrimary>{i18n.t(TranslationInfo.Create)}</StyledButtonTextPrimary>
      </StyledButtonPrimary>
    </StyledButtonWrapper>
  );
}
