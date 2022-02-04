import React from 'react';

import { useTheme } from 'styled-components';
import { AddNewArticleAction } from 'redux/reducers/articlesUserReducer';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { IPropsCreateArticle } from 'typings/interfaces';
import { IArticleData } from 'typings/interfaces';
import { useDispatchHook } from 'utils/Hooks/useDispatchHook';
import {
  StyledInput,
  TextError,
  StyledButtonPrimary,
  StyledButtonTextPrimary,
} from 'components/Styled/Index';

enum Fields {
  title = 'title',
  info = 'info',
  description = 'description',
  required = 'Required',
}

export default function CreateArticleForm({ id }: IPropsCreateArticle) {
  const [dispatch] = useDispatchHook();
  const theme = useTheme();
  const formSubmit = (values: IArticleData) => {
    const data = {
      ...values,
      id,
    };
    dispatch(AddNewArticleAction(data));
  };

  const SignupSchema = Yup.object().shape({
    title: Yup.string().required(Fields.required),
    description: Yup.string().required(Fields.required),
    info: Yup.string().required(Fields.required),
  });

  return (
    <>
      <Formik
        initialValues={{
          [Fields.title]: '',
          [Fields.description]: '',
          [Fields.info]: '',
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
        }: FormikProps<IArticleData>) => (
          <>
            <StyledInput
              onChangeText={handleChange(Fields.title)}
              onBlur={handleBlur(Fields.title)}
              value={values.title}
              maxLength={50}
              placeholder={Fields.title}
              placeholderTextColor={theme.colors.secondaryTextColor}
            />
            {errors.title && touched.title ? <TextError>{errors.title}</TextError> : null}
            <StyledInput
              onChangeText={handleChange(Fields.description)}
              onBlur={handleBlur(Fields.description)}
              value={values.description}
              multiline
              heightInput={80}
              placeholder={Fields.description}
              placeholderTextColor={theme.colors.secondaryTextColor}
            />
            {errors.description && touched.description ? (
              <TextError>{errors.description}</TextError>
            ) : null}
            <StyledInput
              onChangeText={handleChange(Fields.info)}
              onBlur={handleBlur(Fields.info)}
              value={values.info}
              placeholder={Fields.info}
              multiline
              heightInput={120}
              placeholderTextColor={theme.colors.secondaryTextColor}
            />
            {errors.info && touched.info ? <TextError>{errors.info}</TextError> : null}
            <StyledButtonPrimary onPress={() => handleSubmit()}>
              <StyledButtonTextPrimary>Submit</StyledButtonTextPrimary>
            </StyledButtonPrimary>
          </>
        )}
      </Formik>
    </>
  );
}
