import React from 'react';

import {
  StyledButtonPrimary,
  StyledButtonTextPrimary,
  StyledButtonPrimaryDisabled,
} from 'components/Styled/Index';
import { FormSubmit } from 'typings/enums';

interface IButtonSubmitProps {
  handleSubmit: () => void;
  isDisabled?: boolean;
  isValidPhone?: boolean;
}

export default function CustomButton({ handleSubmit, isDisabled = false }: IButtonSubmitProps) {
  const onSubmitHandler = () => {
    !isDisabled && handleSubmit();
  };

  if (isDisabled) {
    return (
      <StyledButtonPrimaryDisabled>
        <StyledButtonTextPrimary>{FormSubmit.Submit}</StyledButtonTextPrimary>
      </StyledButtonPrimaryDisabled>
    );
  }

  return (
    <StyledButtonPrimary onPress={onSubmitHandler}>
      <StyledButtonTextPrimary>{FormSubmit.Submit}</StyledButtonTextPrimary>
    </StyledButtonPrimary>
  );
}
