import React, { useState, useEffect } from 'react';

import { RootState } from 'redux/store';
import { useSelector } from 'react-redux';
import { checkError } from 'redux/reducers/usersReducer';
import AwesomeAlert from 'react-native-awesome-alerts';

import { useDispatchHook } from 'utils/hooks/useDispatchHook';

export default function ErrorAlert() {
  const [notificationTitle, setNotificationTitle] = useState<string>('');
  const [notificationText, setNotificationText] = useState<string>('');
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const { error } = useSelector((state: RootState) => state.users);
  const [dispatch] = useDispatchHook();

  const hideAlert = () => {
    setShowAlert(false);
    setNotificationTitle('');
    setNotificationText('');
    dispatch(checkError());
  };

  useEffect(() => {
    if (error?.length) {
      setNotificationText(error);
      setNotificationTitle('Wrong email or password!');
      setShowAlert(true);
    }
  }, [error]);

  return (
    <AwesomeAlert
      show={showAlert}
      showProgress={false}
      title={notificationTitle}
      message={notificationText}
      closeOnTouchOutside={true}
      closeOnHardwareBackPress={false}
      showCancelButton={true}
      showConfirmButton={false}
      cancelText="Close"
      confirmButtonColor="#DD6B55"
      onCancelPressed={() => {
        hideAlert();
      }}
    />
  );
}
