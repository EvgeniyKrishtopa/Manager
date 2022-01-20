import React from 'react';

import styled from 'styled-components/native';
import { SignInAction, SignUpAction } from 'redux/reducers/usersReducer';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';

import { IAuthData } from 'typings/interfaces';
import { useDispatchHook } from 'utils/hooks/useDispatchHook';

const StyledInput = styled.TextInput`
  border-bottom-width: 2px;
  border-style: solid;
  border-color: #fff;
  padding: 10px 0;
  color: #fff;
  font-size: 16px;
  margin-bottom: 15px;
  width: 300px;
`;

const TextError = styled.Text`
  font-size: 16px;
  color: #ef2f88;
  padding: 5px 0 20px;
  margin-top: -15px;
`;

const StyledButtonSubmit = styled.TouchableOpacity`
  background-color: #519259;
  border-radius: 20px;
  padding: 12px 45px;
`;

const StyledButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
`;

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

export default function LoginForm(props: LoginForm) {
  const [dispatch] = useDispatchHook();

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
          isSubmitting,
        }: FormikProps<IAuthData>) => (
          <>
            <StyledInput
              onChangeText={handleChange(Fields.email)}
              onBlur={handleBlur(Fields.email)}
              value={values.email}
              placeholder="Email"
              placeholderTextColor="#fff"
            />
            {errors.email && touched.email ? <TextError>{errors.email}</TextError> : null}
            <StyledInput
              onChangeText={handleChange(Fields.password)}
              onBlur={handleBlur(Fields.password)}
              value={values.password}
              placeholder="Password"
              secureTextEntry
              placeholderTextColor="#fff"
            />
            {errors.password && touched.password ? <TextError>{errors.password}</TextError> : null}
            <StyledButtonSubmit onPress={() => handleSubmit()} disabled={isSubmitting}>
              <StyledButtonText>Submit</StyledButtonText>
            </StyledButtonSubmit>
          </>
        )}
      </Formik>
    </>
  );
}
