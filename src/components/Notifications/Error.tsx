import React from 'react';

import styled from 'styled-components/native';
import { useLanguage } from 'utils/Hooks/useLanguage';
import { TranslationInfo } from 'typings/enums';

const StyledWrapperError = styled.View`
  width: 90%;
  max-width: 420px;
  background-color: ${(props) => props.theme.colors.secondaryTextColor};
  height: 70px;
  padding: 10px 15px;
  border-radius: 6px;
  border-left-color: ${(props) => props.theme.colors.error};
  border-left-width: 4px;
  border-style: solid;
  position: relative;
`;

const StyledTextTitleError = styled.Text`
  font-size: 18px;
  margin-bottom: 5px;
  font-family: ${(props) => props.theme.fonts.primaryBold};
  color: ${(props) => props.theme.colors.error};
`;

const StyledTextDescriptionError = styled.Text`
  font-size: 16px;
  font-family: ${(props) => props.theme.fonts.primaryMedium};
  color: ${(props) => props.theme.colors.error};
`;

export interface IPropsMessageNotification {
  message?: string;
}

export default function ErrorNotification() {
  const i18n = useLanguage();

  return (
    <StyledWrapperError>
      <StyledTextTitleError>{i18n.t(TranslationInfo.ErrorNotification)}</StyledTextTitleError>
      <StyledTextDescriptionError>{i18n.t(TranslationInfo.ErrorOccurs)}</StyledTextDescriptionError>
    </StyledWrapperError>
  );
}
