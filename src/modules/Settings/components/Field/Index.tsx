import React, { Dispatch, SetStateAction } from 'react';

import InputScrollView from 'react-native-input-scroll-view';
import styled from 'styled-components/native';
import { StyledInput } from 'components/Styled/Index';

interface IProps {
  type: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  onBlurHandler: () => void;
  onFocusHandler: () => void;
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

export default function Field({ type, value, setValue, onBlurHandler, onFocusHandler }: IProps) {
  return (
    <StyledFieldWrapper>
      <StyledFieldLabel>{type}</StyledFieldLabel>
      <InputScrollView keyboardOffset={30}>
        <StyledInput
          onChangeText={setValue}
          value={value}
          onBlur={onBlurHandler}
          onFocus={onFocusHandler}
        />
      </InputScrollView>
    </StyledFieldWrapper>
  );
}
