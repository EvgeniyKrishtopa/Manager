import React, { useEffect, useState, useLayoutEffect, useCallback } from 'react';

import { RootState } from 'redux/store';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import SaveButton from './components/Save/Index';
import Field from './components/Field/Index';
import Avatar from 'components/Avatar/Index';
import { useDispatchHook } from 'utils/Hooks/useDispatchHook';
import { useGetOrientation } from 'utils/Hooks/useGetOrientation';
import TouchableDismissWrappper from 'utils/TouchableDismissWrappper';
import ErrorBoundary from 'utils/ErrorBoundary';
import { SettingsLabels, Errors } from 'typings/enums';
import { UpdateUserAction, UploadUserImageAction } from 'redux/reducers/usersReducer';
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
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isNameChanged, setIsNameChanged] = useState<boolean>(false);
  const [isAvatarChanged, setIsAvatarChanged] = useState<boolean>(false);

  const { userData, imageURL } = useSelector((state: RootState) => state.users);

  const [dispatch] = useDispatchHook();

  const { orientation } = useGetOrientation();

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
    if (isNameChanged && isAvatarChanged) {
      dispatch(UploadUserImageAction({ id: userData.uid, userAvatar: image }));
      dispatch(UpdateUserAction({ userName: name }));
      setIsNameChanged(false);
      setIsAvatarChanged(false);

      return;
    }
    if (isNameChanged) {
      dispatch(UpdateUserAction({ userName: name }));
      setIsNameChanged(false);
    }
    if (isAvatarChanged) {
      dispatch(
        UploadUserImageAction({ id: userData.uid, userAvatar: image, isOnlyImageUpdated: true }),
      );
      setIsAvatarChanged(false);
    }
  }, [dispatch, image, isAvatarChanged, isNameChanged, name, userData.uid]);

  useEffect(() => {
    if (userData?.providerData?.length && name && image) {
      const dataUser = userData.providerData[0];

      if (image !== imageURL && name !== dataUser.displayName) {
        setIsNameChanged(true);
        setIsAvatarChanged(true);
      } else if (name !== dataUser.displayName) {
        setIsNameChanged(true);
      } else if (image !== imageURL) {
        setIsAvatarChanged(true);
      } else {
        setIsNameChanged(false);
        setIsAvatarChanged(false);
      }
    }
  }, [userData, name, image, imageURL]);

  useEffect(() => {
    if (userData?.providerData?.length) {
      const dataUser = userData.providerData[0];
      dataUser.displayName.length && setName(dataUser.displayName);
    }
  }, [userData]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <SaveButton
          isNameChanged={isNameChanged}
          isAvatarChanged={isAvatarChanged}
          saveDataHandler={saveDataHandler}
        />
      ),
    });
  }, [navigation, isNameChanged, isAvatarChanged, saveDataHandler]);

  useEffect(() => {
    return () => {
      setIsNameChanged(false);
      setIsAvatarChanged(false);
    };
  }, []);

  return (
    <ErrorBoundary message={Errors.Error}>
      <TouchableDismissWrappper>
        <StyledContainer>
          <StyledScrollView>
            <StyledContainer>
              <StyledContentWrapper orientation={orientation} isFocused={isFocused}>
                <StyledTitle>Account Settings</StyledTitle>
                <Avatar value={image} setValue={setImage} />
              </StyledContentWrapper>

              <Field
                type={SettingsLabels.UserName}
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
