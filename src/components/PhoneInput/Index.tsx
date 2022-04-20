import React from 'react';

import { StyledInput, TextError } from 'components/Styled/Index';
import { useLanguage } from 'utils/Hooks/useLanguage';
import { IPhoneInputProp } from 'typings/interfaces';
import { TranslationInfo } from 'typings/enums';

export default function PhoneInput({
  phoneNumberHandler,
  onBlurHandler,
  isValidPhone,
  isPhoneBlurredWithoutValue,
  phoneNumber,
  placeholder,
  color,
}: IPhoneInputProp) {
  const i18n = useLanguage();

  return (
    <>
      <StyledInput
        onChangeText={phoneNumberHandler}
        value={phoneNumber}
        onBlur={onBlurHandler}
        placeholder={placeholder}
        placeholderTextColor={color}
        keyboardType="phone-pad"
      />
      {!isValidPhone && phoneNumber.length > 6 ? (
        <TextError>{i18n.t(TranslationInfo.InvalidPhone)}</TextError>
      ) : null}
      {isPhoneBlurredWithoutValue ? (
        <TextError>{i18n.t(TranslationInfo.Required)}</TextError>
      ) : null}
    </>
  );
}
