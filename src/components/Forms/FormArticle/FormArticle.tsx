import React, { useState, useEffect, useRef } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import {
  AddNewArticleAction,
  EditArticleAction,
  clearLoading,
} from 'redux/reducers/articlesUserReducer';
import InputScrollView from 'react-native-input-scroll-view';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import uuid from 'react-native-uuid';
import CustomButton from 'components/CustomButton/Index';
import CustomInput from 'components/CustomInput/Index';
import { ArticleEditType } from 'modules/FullViewContact/Index';
import { useNavigationHook } from 'utils/Hooks/useNavigationHook';
import { useDispatchHook } from 'utils/Hooks/useDispatchHook';
import { uidCleaner } from 'utils/helpers';
import { IArticleManageData, IPropsForms, IArticleData } from 'typings/interfaces';
import { Screens } from 'typings/enums';

enum Fields {
  title = 'title',
  info = 'info',
  description = 'description',
  required = 'Required',
}

export default function FormArticle({ id, article = null, isCreate = true }: IPropsForms) {
  const [articleTitle, setArticleTitle] = useState('');
  const [articleDescription, setArticleDescription] = useState('');
  const [articleInfo, setArticleInfo] = useState('');
  const [articleEditedId, setArticleEditedId] = useState<string>('');

  const [titleHeight, setTitleHeight] = useState<number>(50);
  const [descriptionHeight, setDescriptionHeight] = useState<number>(80);
  const [infoHeight, setInfoHeight] = useState<number>(100);

  const valueId = useRef<string>('');

  const { articles, isLoading } = useSelector((state: RootState) => state.articles);

  const [navigation] = useNavigationHook(Screens.EditArticle);

  const [dispatch] = useDispatchHook();

  const values = {
    [Fields.title]: articleTitle,
    [Fields.description]: articleDescription,
    [Fields.info]: articleInfo,
  };

  const editArticleHandler = (dataEdit: ArticleEditType) => {
    dispatch(EditArticleAction(dataEdit));
  };

  const addNewArticleHandler = (dataCreate: IArticleData) => {
    dispatch(AddNewArticleAction(dataCreate));
  };

  useEffect(() => {
    if (article) {
      setArticleTitle(article.title);
      setArticleDescription(article.description);
      setArticleInfo(article.info);
      setArticleEditedId(article.id);
    }
  }, [article]);

  useEffect(() => {
    if (!valueId.current && isCreate) {
      const newArticleIdCreated = uuid.v4().toString();
      const newArticleId = uidCleaner(newArticleIdCreated);
      valueId.current = newArticleId;
    }
  }, [isCreate]);

  useEffect(() => {
    return () => {
      valueId.current = '';
    };
  }, []);
  //TODO - move logic to parent components
  useEffect(() => {
    if (!isLoading) {
      dispatch(clearLoading());

      let article;

      if (!isCreate) {
        article = articles?.find((item: IArticleManageData) => item.id === articleEditedId);
      }

      if (article) {
        const params = { article };
        //@ts-ignore
        navigation.navigate(Screens.FullViewArticle, params);
      } else {
        navigation.navigate(Screens.Articles);
      }
    }
  }, [isLoading, articles]);
  //TODO - move logic to parent components
  const formSubmit = (values: IArticleData) => {
    const dataCreate = {
      ...values,
      userId: id,
      id: valueId.current,
    };
    const dataEdit = {
      ...values,
      userId: id,
      id: articleEditedId,
    };
    isCreate ? addNewArticleHandler(dataCreate) : editArticleHandler(dataEdit);
  };

  const CreateArticleSchema = Yup.object().shape({
    title: Yup.string().required(Fields.required),
    description: Yup.string().required(Fields.required),
    info: Yup.string().required(Fields.required),
  });

  return (
    <Formik
      enableReinitialize
      initialValues={values}
      validationSchema={CreateArticleSchema}
      onSubmit={(values, { resetForm }) => {
        formSubmit(values);
        isCreate && resetForm();
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
      }: FormikProps<IArticleData>) => (
        <InputScrollView>
          <CustomInput
            fieldName={Fields.title}
            value={values.title}
            error={errors.title}
            touched={touched.title}
            handleChange={handleChange}
            handleBlur={handleBlur}
            heightInput={titleHeight}
            maxLength={50}
            setDynamicHeight={setTitleHeight}
          />
          <CustomInput
            fieldName={Fields.description}
            value={values.description}
            error={errors.description}
            touched={touched.description}
            handleChange={handleChange}
            handleBlur={handleBlur}
            heightInput={descriptionHeight}
            multiline={true}
            setDynamicHeight={setDescriptionHeight}
          />
          <CustomInput
            fieldName={Fields.info}
            value={values.info}
            error={errors.info}
            touched={touched.info}
            handleChange={handleChange}
            handleBlur={handleBlur}
            heightInput={infoHeight}
            multiline={true}
            setDynamicHeight={setInfoHeight}
          />
          <CustomButton handleSubmit={handleSubmit} isDisabled={!(isValid && dirty)} />
        </InputScrollView>
      )}
    </Formik>
  );
}
