import React from 'react';

import styled from 'styled-components/native';
import { AlertsInfo } from 'typings/enums';

const StyledWrapperSuccess = styled.View`
  width: 90%;
  max-width: 420px;
  background-color: ${(props) => props.theme.colors.secondaryTextColor};
  height: 70px;
  border-radius: 6px;
  border-left-color: ${(props) => props.theme.colors.primary};
  border-left-width: 4px;
  padding: 10px 15px;
  border-style: solid;
  position: relative;
`;

const StyledTextTitleSuccess = styled.Text`
  font-size: 18px;
  margin-bottom: 5px;
  font-family: ${(props) => props.theme.fonts.primaryBold};
  color: ${(props) => props.theme.colors.primary};
`;

const StyledTextDescriptionSuccess = styled.Text`
  font-size: 16px;
  font-family: ${(props) => props.theme.fonts.primaryMedium};
  color: ${(props) => props.theme.colors.primary};
`;

interface IPropsMessageNotification {
  message?: string;
}

export default function SuccessNotification({ message }: IPropsMessageNotification) {
  return (
    <StyledWrapperSuccess>
      <StyledTextTitleSuccess>{AlertsInfo.Success}</StyledTextTitleSuccess>
      <StyledTextDescriptionSuccess>
        {message ? message : 'Settings were updated!'}
      </StyledTextDescriptionSuccess>
    </StyledWrapperSuccess>
  );
}
