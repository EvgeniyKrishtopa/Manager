import React from 'react';

import styled from 'styled-components/native';
import { StyledTitle } from 'components/Styled/Index';

const StyledWrapper = styled.View`
  padding-top: 30px;
`;
const StyledDescription = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.colors.primary};
  font-family: ${(props) => props.theme.fonts.primaryMedium};
  margin-bottom: 30px;
  padding: 0 15px;
`;

const StyledArticleInfo = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.colors.mainTextColor};
  font-family: ${(props) => props.theme.fonts.primaryMedium};
  padding: 0 15px 15px;
  margin-bottom: 20px;
`;

interface IViewProps {
  title: string;
  description: string;
  info: string;
}

function View({ description, info, title }: IViewProps) {
  return (
    <StyledWrapper>
      <StyledTitle>{title}</StyledTitle>
      <StyledDescription>{description}</StyledDescription>
      <StyledArticleInfo>{info}</StyledArticleInfo>
    </StyledWrapper>
  );
}

export default View;
