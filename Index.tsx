import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
//@ts-ignore
import { ModalPortal } from 'react-native-modals';
import { clearErrorUser, clearTypeUser } from 'redux/reducers/usersReducer';
import { clearErrorArticle, clearTypeArticle } from 'redux/reducers/articlesUserReducer';
import { clearErrorContact, clearTypeContact } from 'redux/reducers/contactsUserReducer';
import RootStack from 'navigations/Index';
import Notification from 'components/Notifications/Index';
import { ToastProvider } from 'react-native-toast-notifications';
import { useDispatchHook } from 'utils/Hooks/useDispatchHook';

export default function RootComponent() {
  const [fontLoaded, setFontLoaded] = useState<boolean>(false);
  const { error, typeUserAction } = useSelector((state: RootState) => state.users);
  const { typeArticleAction, errorArticle } = useSelector((state: RootState) => state.articles);
  const { typeContactAction, errorContact } = useSelector((state: RootState) => state.contacts);
  const [dispatch] = useDispatchHook();

  useEffect(() => {
    setTimeout(() => {
      error?.length && dispatch(clearErrorUser());
      typeUserAction?.length && dispatch(clearTypeUser());
    }, 2000);
  }, [error, typeUserAction, dispatch]);

  useEffect(() => {
    setTimeout(() => {
      typeArticleAction?.length && dispatch(clearTypeArticle());
      errorArticle?.length && dispatch(clearErrorArticle());
    }, 2000);
  }, [typeArticleAction, errorArticle, dispatch]);

  useEffect(() => {
    setTimeout(() => {
      typeContactAction?.length && dispatch(clearTypeContact());
      errorContact?.length && dispatch(clearErrorContact());
    }, 2000);
  }, [typeContactAction, errorContact, dispatch]);

  const loadFonts = () => {
    return Font.loadAsync({
      'Montserrat-Thin': require('./assets/fonts/Montserrat-Thin.ttf'),
      'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
      'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
      'WorkSans-Light': require('./assets/fonts/WorkSans-Light.ttf'),
      'WorkSans-Medium': require('./assets/fonts/WorkSans-Medium.ttf'),
      'WorkSans-SemiBold': require('./assets/fonts/WorkSans-SemiBold.ttf'),
    });
  };

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  return (
    <ToastProvider
      offsetBottom={40}
      swipeEnabled={true}
      renderToast={(toast) => <Notification error={error} toast={toast} />}
    >
      <RootStack />
      <ModalPortal />
    </ToastProvider>
  );
}
