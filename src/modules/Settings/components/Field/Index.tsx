import React, { Dispatch, SetStateAction } from 'react';

import styled from 'styled-components/native';
import { StyledInput } from 'components/Styled/Index';

interface IProps {
  type: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const StyledFieldWrapper = styled.View`
  padding: 10px 0;
`;

const StyledFieldLabel = styled.Text`
  color: ${(props) => props.theme.colors.mainTextColor};
  padding-top: 5px;
  font-size: 16px;
  font-family: ${(props) => props.theme.fonts.secondaryMedium};
`;

export default function Field({ type, value, setValue }: IProps) {
  return (
    <StyledFieldWrapper>
      <StyledFieldLabel>{type}</StyledFieldLabel>
      <StyledInput onChangeText={setValue} value={value} />
    </StyledFieldWrapper>
  );
}
