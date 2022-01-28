import React from 'react';

import { useTheme } from 'styled-components';
import { SignInAction, SignUpAction } from 'redux/reducers/usersReducer';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';

import { IAuthData } from 'typings/interfaces';
import { useDispatchHook } from 'utils/Hooks/useDispatchHook';
import {
  StyledInput,
  TextError,
  StyledButtonPrimary,
  StyledButtonTextPrimary,
} from 'components/Styled/Index';

type LoginForm = {
  SignIn?: boolean;
  SignUp?: boolean;
};

enum Fields {
  email = 'email',
  password = 'password',
  invalid = 'Invalid email',
  required = 'Required',
  shortPassword = 'Too short password!',
  longPassword = 'Too long password!',
}

export default function SettingsForm(props: LoginForm) {
  const [dispatch] = useDispatchHook();
  const theme = useTheme();
  const formSubmit = (values: IAuthData) => {
    const data = props.SignIn ? SignInAction(values) : SignUpAction(values);
    dispatch(data);
  };

  const SignupSchema = Yup.object().shape({
    email: Yup.string().email(Fields.invalid).required(Fields.required),
    password: Yup.string()
      .min(6, Fields.shortPassword)
      .max(15, Fields.longPassword)
      .required(Fields.required),
  });

  return (
    <>
      <Formik
        initialValues={{
          [Fields.email]: '',
          [Fields.password]: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, { resetForm }) => {
          formSubmit(values);
          resetForm();
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }: FormikProps<IAuthData>) => (
          <>
            <StyledInput
              onChangeText={handleChange(Fields.email)}
              onBlur={handleBlur(Fields.email)}
              value={values.email}
              placeholder={Fields.email}
              placeholderTextColor={theme.colors.secondaryTextColor}
            />
            {errors.email && touched.email ? <TextError>{errors.email}</TextError> : null}
            <StyledInput
              onChangeText={handleChange(Fields.password)}
              onBlur={handleBlur(Fields.password)}
              value={values.password}
              placeholder={Fields.password}
              secureTextEntry
              placeholderTextColor={theme.colors.secondaryTextColor}
            />
            {errors.password && touched.password ? <TextError>{errors.password}</TextError> : null}
            <StyledButtonPrimary onPress={() => handleSubmit()}>
              <StyledButtonTextPrimary>Submit</StyledButtonTextPrimary>
            </StyledButtonPrimary>
          </>
        )}
      </Formik>
    </>
  );
}
