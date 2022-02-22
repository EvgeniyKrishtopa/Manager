import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { useTheme } from 'styled-components';
import { useDispatchHook } from 'utils/Hooks/useDispatchHook';
import { IUserUpdationData } from 'typings/interfaces';
import { UpdateUserAction, UploadUserImageAction } from 'redux/reducers/usersReducer';
import { Feather } from '@expo/vector-icons';

const StyledSaveButton = styled.TouchableOpacity`
  margin: 5px 0;
`;

export default function SaveButton({ userName, userAvatar }: IUserUpdationData) {
  const [isNameChanged, setIsNameChanged] = useState<boolean>(false);
  const [isAvatarChanged, setIsAvatarChanged] = useState<boolean>(false);
  const [dispatch] = useDispatchHook();
  const { userData, imageURL } = useSelector((state: RootState) => state.users);
  const theme = useTheme();

  useEffect(() => {
    if (userData?.providerData?.length) {
      const dataUser = userData.providerData[0];
      if (userName && userName !== dataUser.displayName) {
        setIsNameChanged(true);
      } else if (userAvatar && userAvatar !== imageURL) {
        setIsAvatarChanged(true);
      } else {
        setIsNameChanged(false);
        setIsAvatarChanged(false);
      }
    }
  }, [userData, userName, userAvatar, imageURL]);

  useEffect(() => {
    return () => {
      setIsNameChanged(false);
      setIsAvatarChanged(false);
    };
  }, []);

  const onPressHandler = () => {
    if (isNameChanged) {
      dispatch(UpdateUserAction({ userName }));
      setIsNameChanged(false);
    } else if (isAvatarChanged) {
      dispatch(UploadUserImageAction({ id: userData.uid, userAvatar }));
      setIsAvatarChanged(false);
    }
  };

  return (
    <>
      {isNameChanged || isAvatarChanged ? (
        <StyledSaveButton onPress={onPressHandler}>
          <Feather name="save" size={28} color={theme.colors.primary} />
        </StyledSaveButton>
      ) : (
        <Feather name="save" size={28} color={theme.colors.disabled} />
      )}
    </>
  );
}
