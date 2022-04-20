import React from 'react';

import { Keyboard, KeyboardAvoidingView } from 'react-native';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { useLanguage } from 'utils/Hooks/useLanguage';
import CustomButtonSubmit from 'components/CustomButton/Index';
import CustomInput from 'components/CustomInput/Index';
import { IAuthData } from 'typings/interfaces';
import { Fields, TranslationInfo } from 'typings/enums';

type LoginForm = {
  onSignInSubmitData?: (values: IAuthData) => void;
  onSignUpSubmitData?: (values: IAuthData) => void;
};

export default function FormLogin({ onSignInSubmitData, onSignUpSubmitData }: LoginForm) {
  const i18n = useLanguage();

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
              placeholder={i18n.t(TranslationInfo.Email)}
              touched={touched.email}
              handleChange={handleChange}
              handleBlur={handleBlur}
              keyboard="email-address"
            />
            <CustomInput
              fieldName={Fields.password}
              value={values.password}
              error={errors.password}
              placeholder={i18n.t(TranslationInfo.Password)}
              touched={touched.password}
              handleChange={handleChange}
              handleBlur={handleBlur}
              secureTextEntry={true}
            />
            <CustomButtonSubmit handleSubmit={handleSubmit} isDisabled={!(isValid && dirty)} />
          </KeyboardAvoidingView>
        )}
      </Formik>
    </>
  );
}
