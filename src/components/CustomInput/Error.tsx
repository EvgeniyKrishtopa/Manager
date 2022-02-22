import React from 'react';

import { TextError } from 'components/Styled/Index';
import { FormikErrors } from 'formik';

interface IErrorInputProps {
  error: string | string[] | FormikErrors<any> | FormikErrors<any>[] | undefined;
  touched: boolean;
  isValidateWithoutTouched: boolean;
}

export default function ErrorInput({ error, touched, isValidateWithoutTouched }: IErrorInputProps) {
  if (error && touched) {
    return <TextError>{error}</TextError>;
  } else if (isValidateWithoutTouched && error) {
    return <TextError>{error}</TextError>;
  } else {
    return <></>;
  }
}
