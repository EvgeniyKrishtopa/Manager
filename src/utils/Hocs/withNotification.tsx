import React, { ComponentType, useEffect } from 'react';

import { RootState } from 'redux/store';
import { useSelector } from 'react-redux';
import { useToast } from 'react-native-toast-notifications';
import { IWithNotificationProps } from 'typings/interfaces';

export const withNotification =
  (props: IWithNotificationProps) => (WrappedComponent: ComponentType) => (moreProps: any) => {
    const toast = useToast();
    const { error, loading } = useSelector((state: RootState) => state.users);
    const { textNotification, isNotificationSuccessVisible, isNotificationErrorVisible } = props;
    const toastRender = (textNotification: string | undefined) => {
      toast.show(textNotification || '', {
        type: 'custom',
        placement: 'bottom',
        duration: 2000,
        animationType: 'slide-in',
      });
    };
    useEffect(() => {
      if (loading && isNotificationSuccessVisible) {
        toastRender(textNotification);
      } else if (error.length && isNotificationErrorVisible) {
        toastRender(textNotification);
      }
    }, [error, loading, toast, toastRender]);

    return <WrappedComponent {...moreProps} />;
  };
