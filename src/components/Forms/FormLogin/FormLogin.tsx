import React from 'react';

import { Keyboard, KeyboardAvoidingView } from 'react-native';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';

import { IAuthData } from 'typings/interfaces';
import CustomButton from 'components/CustomButton/Index';
import CustomInput from 'components/CustomInput/Index';
import { Fields } from 'typings/enums';

type LoginForm = {
  onSignInSubmitData?: (values: IAuthData) => void;
  onSignUpSubmitData?: (values: IAuthData) => void;
};

export default function FormLogin({ onSignInSubmitData, onSignUpSubmitData }: LoginForm) {
  const formSubmit = (values: IAuthData) => {
    Keyboard.dismiss();

    onSignInSubmitData && onSignInSubmitData(values);
    onSignUpSubmitData && onSignUpSubmitData(values);
  };

  const values = {
    [Fields.email]: '',
    [Fields.password]: '',
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
        initialValues={values}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          formSubmit(values);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
          dirty,
        }: FormikProps<IAuthData>) => (
          <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={10}>
            <CustomInput
              fieldName={Fields.email}
              value={values.email}
              error={errors.email}
              touched={touched.email}
              handleChange={handleChange}
              handleBlur={handleBlur}
              keyboard="email-address"
            />
            <CustomInput
              fieldName={Fields.password}
              value={values.password}
              error={errors.password}
              touched={touched.password}
              handleChange={handleChange}
              handleBlur={handleBlur}
              secureTextEntry={true}
            />
            <CustomButton handleSubmit={handleSubmit} isDisabled={!(isValid && dirty)} />
          </KeyboardAvoidingView>
        )}
      </Formik>
    </>
  );
}
