import React from 'react';

import {
  StyledButtonPrimary,
  StyledButtonTextPrimary,
  StyledButtonPrimaryDisabled,
} from 'components/Styled/Index';
import { useLanguage } from 'utils/Hooks/useLanguage';
import { TranslationInfo } from 'typings/enums';

interface IButtonSubmitProps {
  handleSubmit: () => void;
  isDisabled?: boolean;
  isValidPhone?: boolean;
}

export default function CustomButtonSubmit({
  handleSubmit,
  isDisabled = false,
}: IButtonSubmitProps) {
  const i18n = useLanguage();

  const onSubmitHandler = () => {
    !isDisabled && handleSubmit();
  };

  if (isDisabled) {
    return (
      <StyledButtonPrimaryDisabled>
        <StyledButtonTextPrimary>{i18n.t(TranslationInfo.Submit)}</StyledButtonTextPrimary>
      </StyledButtonPrimaryDisabled>
    );
  }

  return (
    <StyledButtonPrimary onPress={onSubmitHandler}>
      <StyledButtonTextPrimary>{i18n.t(TranslationInfo.Submit)}</StyledButtonTextPrimary>
    </StyledButtonPrimary>
  );
}
