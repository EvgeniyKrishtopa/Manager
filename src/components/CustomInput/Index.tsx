import React from 'react';

import { useTheme } from 'styled-components';
import ErrorInput from './Error';
import { StyledInput } from 'components/Styled/Index';
import { ICustomInputProp } from 'typings/interfaces';

export default function CustomInput({
  fieldName,
  error,
  value,
  touched = false,
  heightInput,
  handleChange,
  handleBlur,
  maxLength,
  multiline = false,
  secureTextEntry = false,
  isValidateWithoutTouched = false,
  keyboard = 'default',
  setDynamicHeight,
}: ICustomInputProp) {
  const theme = useTheme();
  return (
    <>
      <StyledInput
        onChangeText={handleChange(fieldName)}
        onBlur={handleBlur(fieldName)}
        value={value}
        multiline={multiline}
        maxLength={maxLength}
        heightInput={heightInput}
        placeholder={fieldName}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={theme.colors.secondaryTextColor}
        keyboardType={keyboard}
        onContentSizeChange={(e) =>
          value.length &&
          heightInput &&
          setDynamicHeight &&
          e.nativeEvent.contentSize.height > heightInput &&
          setDynamicHeight(e.nativeEvent.contentSize.height + 20)
        }
      />
      <ErrorInput
        error={error}
        touched={touched}
        isValidateWithoutTouched={isValidateWithoutTouched}
      />
    </>
  );
}
