import React, { useState, useEffect } from 'react';

import styled from 'styled-components/native';
import { RootState } from 'redux/store';
import { useSelector } from 'react-redux';
import { AddNewArticleAction, clearLoadingArticle } from 'redux/reducers/articlesUserReducer';
import {
  AddNewContactAction,
  clearLoadingContact,
  UploadContactImageAction,
} from 'redux/reducers/contactsUserReducer';
import FormArticle from 'components/Forms/FormArticle/FormArticle';
import FormContact from 'components/Forms/FormContact/FormContact';
import Loader from 'components/Loader/Index';
import { useDispatchHook } from 'utils/Hooks/useDispatchHook';
import { useNavigationHook } from 'utils/Hooks/useNavigationHook';
import TouchableDismissWrappper from 'utils/TouchableDismissWrappper';
import { uidCleaner } from 'utils/helpers';
import { IPropsForms, IArticleData, IContactDataCreate } from 'typings/interfaces';
import { Screens } from 'typings/enums';

const StyledWrapper = styled.View`
  padding: 10px 30px;
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
`;

export default function Creator({ id, type }: IPropsForms) {
  const [isForSubmitting, setIsFormSubmitting] = useState<boolean>(false);
  const [dispatch] = useDispatchHook();
  const [navigation] = useNavigationHook(Screens.EditArticle);
  const { articles, isLoadingArticle } = useSelector((state: RootState) => state.articles);
  const { contacts, isLoadingContact } = useSelector((state: RootState) => state.contacts);

  const formArticleCreateSubmit = (dataCreate: IArticleData) => {
    dispatch(AddNewArticleAction(dataCreate));
    setIsFormSubmitting(true);
  };

  const formContactCreateSubmit = ({ dataCreate, avatarLink }: IContactDataCreate) => {
    dispatch(AddNewContactAction(dataCreate));

    if (dataCreate.docId) {
      const avatarCreateId = uidCleaner(dataCreate.docId);

      avatarLink.length &&
        dispatch(
          UploadContactImageAction({
            id: dataCreate.docId,
            userAvatar: avatarLink,
            avatarId: avatarCreateId,
          }),
        );
    }

    setIsFormSubmitting(true);
  };

  useEffect(() => {
    if (!isLoadingArticle) {
      dispatch(clearLoadingArticle());
      navigation.navigate(Screens.Articles);
      setIsFormSubmitting(false);
    }
  }, [isLoadingArticle, articles, dispatch, navigation]);

  useEffect(() => {
    if (!isLoadingContact) {
      dispatch(clearLoadingContact());
      navigation.navigate(Screens.Contacts);
      setIsFormSubmitting(false);
    }
  }, [isLoadingContact, contacts, dispatch, navigation]);

  return (
    <TouchableDismissWrappper>
      {!isForSubmitting ? (
        <StyledWrapper>
          {type === 'contact' ? (
            <FormContact id={id} formContactCreateSubmit={formContactCreateSubmit} />
          ) : (
            <FormArticle id={id} formArticleCreateSubmit={formArticleCreateSubmit} />
          )}
        </StyledWrapper>
      ) : (
        <Loader />
      )}
    </TouchableDismissWrappper>
  );
}
