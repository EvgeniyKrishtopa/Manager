import React from 'react';

import styled from 'styled-components/native';
import { LogOutAction } from 'redux/reducers/usersReducer';
import { useDispatchHook } from 'utils/hooks/useDispatchHook';

import { Entypo } from '@expo/vector-icons';

const StyledLogOutButton = styled.TouchableOpacity`
  margin: 5px 12px;
`;

export default function LogOutButton() {
  const [dispatch] = useDispatchHook();

  const onPressHandler = () => {
    dispatch(LogOutAction());
  };

  return (
    <StyledLogOutButton onPress={onPressHandler}>
      <Entypo name="log-out" size={28} color="#B762C1" />
    </StyledLogOutButton>
  );
}
