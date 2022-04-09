import React, { ComponentType, useCallback, useEffect, useState } from 'react';
import { AlertsInfo, ManageActivities, UserActivities } from 'typings/enums';

import { RootState } from 'redux/store';
import { useSelector } from 'react-redux';
import { useToast } from 'react-native-toast-notifications';

export const withNotification = (WrappedComponent: ComponentType) => (moreProps: any) => {
  const [userAction, setUserAction] = useState<string>('');
  const [articleAction, setArticleAction] = useState<string>('');
  const [contactAction, setContactAction] = useState<string>('');

  const { typeUserAction, error } = useSelector((state: RootState) => state.users);
  const { typeArticleAction, errorArticle } = useSelector((state: RootState) => state.articles);
  const { typeContactAction, errorContact } = useSelector((state: RootState) => state.contacts);

  const toast = useToast();

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
      userAction === UserActivities.Update && toastRender(AlertsInfo.SettingsAction);
      setUserAction('');
    } else if (error.length) {
      toastRender(AlertsInfo.Error);
    }
  }, [error, userAction, toastRender]);

  useEffect(() => {
    if (articleAction) {
      articleAction === ManageActivities.Add && toastRender(AlertsInfo.AddNewArticleAction);
      articleAction === ManageActivities.Edit && toastRender(AlertsInfo.EditArticleAction);
      articleAction === ManageActivities.Delete && toastRender(AlertsInfo.RemoveArticleAction);
      setArticleAction('');
    } else if (errorArticle?.length) {
      toastRender(AlertsInfo.Error);
    }
  }, [errorArticle, toastRender, articleAction]);

  useEffect(() => {
    if (contactAction) {
      contactAction === ManageActivities.Add && toastRender(AlertsInfo.AddNewContactAction);
      contactAction === ManageActivities.Edit && toastRender(AlertsInfo.EditContactAction);
      contactAction === ManageActivities.Delete && toastRender(AlertsInfo.RemoveContactAction);
      setContactAction('');
    } else if (errorContact?.length) {
      toastRender(AlertsInfo.Error);
    }
  }, [errorContact, toastRender, contactAction]);

  return <WrappedComponent {...moreProps} />;
};
