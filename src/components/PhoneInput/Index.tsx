import React from 'react';

import { StyledInput, TextError } from 'components/Styled/Index';
import { IPhoneInputProp } from 'typings/interfaces';

export default function PhoneInput({
  phoneNumberHandler,
  onBlurHandler,
  isValidPhone,
  isPhoneBlurredWithoutValue,
  phoneNumber,
  placeholder,
  color,
}: IPhoneInputProp) {
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
        <TextError>Phone Number is not Valid!</TextError>
      ) : null}
      {isPhoneBlurredWithoutValue ? <TextError>Required!</TextError> : null}
    </>
  );
}
