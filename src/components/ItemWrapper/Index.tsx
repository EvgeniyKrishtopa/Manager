import React from 'react';

import { DeleteContactAction, DeleteContactImageAction } from 'redux/reducers/contactsUserReducer';
import { useTheme } from 'styled-components';
import { useDispatchHook } from 'utils/Hooks/useDispatchHook';
import { AntDesign } from '@expo/vector-icons';
import { StyledDatePost } from 'components/Styled/Index';
import {
  StyledCard,
  StyledIconDeleteWrapper,
  StyledOpenFullCardWrapper,
  StyledOpenFullCardText,
} from 'components/Styled/Index';
import { getFormattedDate } from 'utils/helpers';
import { Moment } from 'moment';
import { IDeleteArticleData } from 'typings/interfaces';

interface IItemWrapperProps {
  children: JSX.Element;
  userId: string;
  id: string;
  openFullScreen: () => void;
  deleteArticle?: (data: IDeleteArticleData) => void;
  deleteContact?: () => void;
  isFrom: string;
  created: Moment;
}

export default function ItemWrapper({
  id,
  userId,
  openFullScreen,
  deleteArticle,
  children,
  created,
  isFrom,
}: IItemWrapperProps) {
  const theme = useTheme();
  const [dispatch] = useDispatchHook();

  const deleteContact = () => {
    dispatch(DeleteContactImageAction({ id }));
    dispatch(DeleteContactAction({ id, userId }));
  };

  const deleteItemHandler = () => {
    isFrom === 'article' && deleteArticle ? deleteArticle({ id, userId }) : deleteContact();
  };

  const openFullItemHandler = () => {
    openFullScreen && openFullScreen();
  };

  return (
    <StyledCard>
      {children}
      {created ? <StyledDatePost>{getFormattedDate(created)}</StyledDatePost> : null}
      <StyledIconDeleteWrapper onPress={deleteItemHandler}>
        <AntDesign name="delete" size={24} color={theme.colors.secondaryBackgroundColor} />
      </StyledIconDeleteWrapper>
      <StyledOpenFullCardWrapper onPress={openFullItemHandler}>
        <StyledOpenFullCardText>Open</StyledOpenFullCardText>
      </StyledOpenFullCardWrapper>
    </StyledCard>
  );
}
