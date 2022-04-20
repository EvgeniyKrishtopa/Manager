import React from 'react';
import { Keyboard } from 'react-native';
import styled from 'styled-components/native';
import { useTheme } from 'styled-components';
import { IUserUpdationData } from 'typings/interfaces';
import { Feather } from '@expo/vector-icons';

const StyledSaveButton = styled.TouchableOpacity`
  margin: 5px 0;
`;

export default function SaveButton({
  isNameChanged,
  isAvatarChanged,
  isLanguageChanged,
  saveDataHandler,
}: IUserUpdationData) {
  const theme = useTheme();

  const onPressHandler = () => {
    saveDataHandler();
    Keyboard.dismiss();
  };

  return (
    <>
      {isNameChanged || isAvatarChanged || isLanguageChanged ? (
        <StyledSaveButton onPress={onPressHandler}>
          <Feather name="save" size={28} color={theme.colors.primary} />
        </StyledSaveButton>
      ) : (
        <Feather name="save" size={28} color={theme.colors.disabled} />
      )}
    </>
  );
}
