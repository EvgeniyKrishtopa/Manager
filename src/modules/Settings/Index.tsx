import React, { useEffect, useState, useLayoutEffect, useCallback } from 'react';

import { RootState } from 'redux/store';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { UpdateUserAction, UploadUserImageAction, setLanguage } from 'redux/reducers/usersReducer';
import SaveButton from './components/Save/Index';
import Field from './components/Field/Index';
import Avatar from 'components/Avatar/Index';
import PickerLanguage from './components/Picker/Index';
import { useDispatchHook } from 'utils/Hooks/useDispatchHook';
import { useLanguage } from 'utils/Hooks/useLanguage';
import { useGetOrientation } from 'utils/Hooks/useGetOrientation';
import TouchableDismissWrappper from 'utils/TouchableDismissWrappper';
import ErrorBoundary from 'utils/ErrorBoundary';
import { TranslationInfo } from 'typings/enums';

interface IContentWrapper {
  orientation: string;
  isFocused: boolean;
}

const StyledScrollView = styled.ScrollView`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.secondaryBackgroundColor};
`;

const StyledContainer = styled.View`
  display: flex;
  align-items: center;
`;

const StyledContentWrapper = styled.View<IContentWrapper>`
  margin-top: ${(props) =>
    props.isFocused && props.orientation === 'Landscape' ? '-180px' : '0px'};
`;

const StyledTitle = styled.Text`
  font-size: 20px;
  font-family: ${(props) => props.theme.fonts.primaryBold};
  color: ${(props) => props.theme.colors.primary};
  padding-top: 20px;
  margin-bottom: 15px;
  text-transform: uppercase;
`;

function Settings({ navigation }: any) {
  const [name, setName] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [lang, setLang] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isNameChanged, setIsNameChanged] = useState<boolean>(false);
  const [isAvatarChanged, setIsAvatarChanged] = useState<boolean>(false);
  const [isLanguageChanged, setIsLanguageChanged] = useState<boolean>(false);
  const { userData, imageURL, language } = useSelector((state: RootState) => state.users);

  const [dispatch] = useDispatchHook();
  const { orientation } = useGetOrientation();
  const i18n = useLanguage();

  const onBlurHandler = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 500);
  };

  const onFocusHandler = () => {
    setTimeout(() => {
      setIsFocused(true);
    }, 500);
  };

  useEffect(() => {
    if (!image.length && imageURL) {
      setImage(imageURL);
    }
  }, [imageURL, image]);

  const saveDataHandler = useCallback(() => {
    if (isNameChanged && isAvatarChanged && isLanguageChanged) {
      dispatch(UploadUserImageAction({ id: userData.uid, userAvatar: image }));
      dispatch(UpdateUserAction({ userName: name }));
      setIsNameChanged(false);
      setIsAvatarChanged(false);
      dispatch(setLanguage({ language: lang, isOnlyLangUpdated: false }));
      setIsLanguageChanged(false);
      return;
    }
    if (isNameChanged) {
      dispatch(UpdateUserAction({ userName: name }));
      setIsNameChanged(false);
    }

    if (isLanguageChanged) {
      dispatch(setLanguage({ language: lang, isOnlyLangUpdated: true }));
      setIsLanguageChanged(false);
    }
    if (isAvatarChanged) {
      dispatch(
        UploadUserImageAction({ id: userData.uid, userAvatar: image, isOnlyImageUpdated: true }),
      );
      setIsAvatarChanged(false);
    }
  }, [
    dispatch,
    image,
    isAvatarChanged,
    isNameChanged,
    lang,
    name,
    isLanguageChanged,
    userData.uid,
  ]);

  useEffect(() => {
    const dataUser = userData.providerData[0];
    if (name.length && dataUser.displayName.length) {
      if (name !== dataUser.displayName) {
        setIsNameChanged(true);
      } else {
        setIsNameChanged(false);
      }
    } else if (name.length && !dataUser.displayName.length) {
      setIsNameChanged(true);
    } else if (!name.length) {
      setIsNameChanged(false);
    }
  }, [userData, name]);

  useEffect(() => {
    if (image.length && imageURL?.length) {
      if (image !== imageURL) {
        setIsAvatarChanged(true);
      } else {
        setIsAvatarChanged(false);
      }
    } else if (image.length && !imageURL?.length) {
      setIsAvatarChanged(true);
    } else if (!image.length) {
      setIsAvatarChanged(false);
    }
  }, [image, imageURL]);

  useEffect(() => {
    if (userData?.providerData?.length) {
      const dataUser = userData.providerData[0];
      dataUser.displayName?.length && setName(dataUser.displayName);
    }
  }, [userData]);

  useEffect(() => {
    if (lang !== language) {
      setIsLanguageChanged(true);
    } else {
      setIsLanguageChanged(false);
    }
  }, [lang, language]);

  useEffect(() => {
    setLang(language);
  }, [language]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <SaveButton
          isNameChanged={isNameChanged}
          isAvatarChanged={isAvatarChanged}
          isLanguageChanged={isLanguageChanged}
          saveDataHandler={saveDataHandler}
        />
      ),
    });
  }, [navigation, isNameChanged, isAvatarChanged, isLanguageChanged, saveDataHandler]);

  useEffect(() => {
    return () => {
      setIsNameChanged(false);
      setIsAvatarChanged(false);
      setIsLanguageChanged(false);
    };
  }, []);

  return (
    <ErrorBoundary message={i18n.t(TranslationInfo.Error)}>
      <TouchableDismissWrappper>
        <StyledContainer>
          <StyledScrollView>
            <StyledContainer>
              <StyledContentWrapper orientation={orientation} isFocused={isFocused}>
                <StyledTitle>{i18n.t(TranslationInfo.AccountSettings)}</StyledTitle>
                <Avatar value={image} setValue={setImage} />
              </StyledContentWrapper>
              <PickerLanguage value={lang} setValue={setLang} />
              <Field
                type={i18n.t(TranslationInfo.UserName)}
                value={name}
                setValue={setName}
                onBlurHandler={onBlurHandler}
                onFocusHandler={onFocusHandler}
              />
            </StyledContainer>
          </StyledScrollView>
        </StyledContainer>
      </TouchableDismissWrappper>
    </ErrorBoundary>
  );
}

export default Settings;
