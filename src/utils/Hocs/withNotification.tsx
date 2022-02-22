import React, { ComponentType, useEffect } from 'react';
import { AlertsInfo, ManageActivities, UserActivities } from 'typings/enums';

import { RootState } from 'redux/store';
import { useSelector } from 'react-redux';
import { useToast } from 'react-native-toast-notifications';
import { IWithNotificationProps } from 'typings/interfaces';

export const withNotification =
  (props: IWithNotificationProps) => (WrappedComponent: ComponentType) => (moreProps: any) => {
    const toast = useToast();
    const { error, typeUserAction } = useSelector((state: RootState) => state.users);
    const { typeArticleAction, errorArticle } = useSelector((state: RootState) => state.articles);
    const { typeContactAction, errorContact } = useSelector((state: RootState) => state.contacts);
    const { isNotificationSuccessVisible, isNotificationErrorVisible } = props;

    const toastRender = (textNotification: string | undefined) => {
      toast.show(textNotification || '', {
        type: 'custom',
        placement: 'bottom',
        duration: 2000,
        animationType: 'slide-in',
      });
    };

    useEffect(() => {
      if (isNotificationSuccessVisible) {
        typeUserAction === UserActivities.Update && toastRender(AlertsInfo.SettingsAction);
      } else if (error.length && isNotificationErrorVisible) {
        toastRender(AlertsInfo.Error);
      }
    }, [error, typeUserAction]);

    useEffect(() => {
      if (isNotificationSuccessVisible) {
        typeArticleAction === ManageActivities.Add && toastRender(AlertsInfo.AddNewArticleAction);
        typeArticleAction === ManageActivities.Edit && toastRender(AlertsInfo.EditArticleAction);
        typeArticleAction === ManageActivities.Delete &&
          toastRender(AlertsInfo.RemoveArticleAction);
      } else if (errorArticle?.length && isNotificationErrorVisible) {
        toastRender(AlertsInfo.Error);
      }
    }, [errorArticle, typeArticleAction]);

    useEffect(() => {
      if (isNotificationSuccessVisible) {
        typeContactAction === ManageActivities.Add && toastRender(AlertsInfo.AddNewContactAction);
        typeContactAction === ManageActivities.Edit && toastRender(AlertsInfo.EditContactAction);
        typeContactAction === ManageActivities.Delete &&
          toastRender(AlertsInfo.RemoveContactAction);
      } else if (errorArticle?.length && isNotificationErrorVisible) {
        toastRender(AlertsInfo.Error);
      }
    }, [errorContact, typeContactAction]);

    return <WrappedComponent {...moreProps} />;
  };
