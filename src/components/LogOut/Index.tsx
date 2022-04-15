import React from 'react';

import { Entypo } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { useTheme } from 'styled-components';
import { clearAvatarUser, LogOutAction } from 'redux/reducers/usersReducer';
import { clearArticles } from 'redux/reducers/articlesUserReducer';
import { clearContacts } from 'redux/reducers/contactsUserReducer';
import { useDispatchHook } from 'utils/Hooks/useDispatchHook';

const StyledLogOutButton = styled.TouchableOpacity`
  margin: 5px 10px;
`;

export default function LogOutButton() {
  const [dispatch] = useDispatchHook();
  const theme = useTheme();

  const onPressHandler = () => {
    dispatch(LogOutAction());
    dispatch(clearArticles());
    dispatch(clearContacts());
    dispatch(clearAvatarUser());
  };

  return (
    <StyledLogOutButton onPress={onPressHandler}>
      <Entypo name="log-out" size={28} color={theme.colors.primary} />
    </StyledLogOutButton>
  );
}
