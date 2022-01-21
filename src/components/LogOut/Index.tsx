import React from 'react';

import styled from 'styled-components/native';
import { useTheme } from 'styled-components';
import { LogOutAction } from 'redux/reducers/usersReducer';
import { useDispatchHook } from 'utils/Hooks/useDispatchHook';

import { Entypo } from '@expo/vector-icons';

const StyledLogOutButton = styled.TouchableOpacity`
  margin: 5px 12px;
`;

export default function LogOutButton() {
  const [dispatch] = useDispatchHook();
  const theme = useTheme();

  const onPressHandler = () => {
    dispatch(LogOutAction());
  };

  return (
    <StyledLogOutButton onPress={onPressHandler}>
      <Entypo name="log-out" size={28} color={theme.colors.secondary} />
    </StyledLogOutButton>
  );
}
