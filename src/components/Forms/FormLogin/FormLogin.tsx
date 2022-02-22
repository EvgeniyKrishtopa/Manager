import React from 'react';

import { KeyboardAvoidingView } from 'react-native';
import { SignInAction, SignUpAction } from 'redux/reducers/usersReducer';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';

import { IAuthData } from 'typings/interfaces';
import { useDispatchHook } from 'utils/Hooks/useDispatchHook';
import CustomButton from 'components/CustomButton/Index';
import CustomInput from 'components/CustomInput/Index';

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

export default function FormLogin(props: LoginForm) {
  const [dispatch] = useDispatchHook();

  const formSubmit = (values: IAuthData) => {
    const data = props.SignIn ? SignInAction(values) : SignUpAction(values);
    dispatch(data);
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
          isValid,
          dirty,
        }: FormikProps<IAuthData>) => (
          <KeyboardAvoidingView>
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
