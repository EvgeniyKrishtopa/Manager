import React, { ComponentType, useCallback, useEffect, useState } from 'react';

import { RootState } from 'redux/store';
import { useSelector } from 'react-redux';
import { useToast } from 'react-native-toast-notifications';
import { useLanguage } from 'utils/Hooks/useLanguage';
import { ManageActivities, UserActivities, TranslationInfo } from 'typings/enums';

export const withNotification = (WrappedComponent: ComponentType) => (moreProps: any) => {
  const [userAction, setUserAction] = useState<string>('');
  const [articleAction, setArticleAction] = useState<string>('');
  const [contactAction, setContactAction] = useState<string>('');

  const { typeUserAction, error } = useSelector((state: RootState) => state.users);
  const { typeArticleAction, errorArticle } = useSelector((state: RootState) => state.articles);
  const { typeContactAction, errorContact } = useSelector((state: RootState) => state.contacts);

  const toast = useToast();
  const i18n = useLanguage();

  const toastRender = useCallback(
    (textNotification: string | undefined) => {
      toast.show(textNotification || '', {
        type: 'custom',
        placement: 'bottom',
        duration: 2000,
        animationType: 'slide-in',
      });
    },
    [toast],
  );

  useEffect(() => {
    setUserAction(typeUserAction);
  }, [typeUserAction]);

  useEffect(() => {
    setArticleAction(typeArticleAction);
  }, [typeArticleAction]);

  useEffect(() => {
    setContactAction(typeContactAction);
  }, [typeContactAction]);

  useEffect(() => {
    if (userAction) {
      userAction === UserActivities.Update && toastRender(i18n.t(TranslationInfo.SettingsAction));
      setUserAction('');
    } else if (error.length) {
      toastRender(i18n.t(TranslationInfo.Error));
    }
  }, [error, userAction, toastRender, i18n]);

  useEffect(() => {
    if (articleAction) {
      articleAction === ManageActivities.Add &&
        toastRender(i18n.t(TranslationInfo.AddNewArticleAction));
      articleAction === ManageActivities.Edit &&
        toastRender(i18n.t(TranslationInfo.EditArticleAction));
      articleAction === ManageActivities.Delete &&
        toastRender(i18n.t(TranslationInfo.RemoveArticleAction));
      setArticleAction('');
    } else if (errorArticle?.length) {
      toastRender(i18n.t(TranslationInfo.Error));
    }
  }, [errorArticle, toastRender, articleAction, i18n]);

  useEffect(() => {
    if (contactAction) {
      contactAction === ManageActivities.Add &&
        toastRender(i18n.t(TranslationInfo.AddNewContactAction));
      contactAction === ManageActivities.Edit &&
        toastRender(i18n.t(TranslationInfo.EditContactAction));
      contactAction === ManageActivities.Delete &&
        toastRender(i18n.t(TranslationInfo.RemoveContactAction));
      setContactAction('');
    } else if (errorContact?.length) {
      toastRender(i18n.t(TranslationInfo.Error));
    }
  }, [errorContact, toastRender, contactAction, i18n]);

  return <WrappedComponent {...moreProps} />;
};
