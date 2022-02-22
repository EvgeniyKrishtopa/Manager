import React from 'react';

import { DeleteArticleAction } from 'redux/reducers/articlesUserReducer';
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
import { FullArticleView, FullContactView } from 'typings/enums';
import { getFormattedDate } from 'utils/helpers';
import { Moment } from 'moment';

interface IItemWrapperProps {
  children: JSX.Element;
  userId: string;
  id: string;
  openFullScreen: (id: string) => void;
  isFrom: string;
  created: Moment;
}

export default function ItemWrapper({
  id,
  userId,
  openFullScreen,
  children,
  created,
  isFrom,
}: IItemWrapperProps) {
  const theme = useTheme();
  const [dispatch] = useDispatchHook();
  //TODO - move logic to parent components
  const deleteContact = () => {
    dispatch(DeleteContactImageAction({ id }));
    dispatch(DeleteContactAction({ id, userId }));
  };

  const deleteArticleHandler = () => {
    isFrom === 'article' ? dispatch(DeleteArticleAction({ id, userId })) : deleteContact();
  };

  const openFullArticleHandler = () => {
    openFullScreen(id);
  };

  return (
    <StyledCard>
      {children}
      {created ? <StyledDatePost>{getFormattedDate(created)}</StyledDatePost> : null}
      <StyledIconDeleteWrapper onPress={deleteArticleHandler}>
        <AntDesign name="delete" size={24} color={theme.colors.secondaryBackgroundColor} />
      </StyledIconDeleteWrapper>
      <StyledOpenFullCardWrapper onPress={openFullArticleHandler}>
        <StyledOpenFullCardText>
          {isFrom === 'article' ? FullArticleView.OpenArticle : FullContactView.OpenContact}
        </StyledOpenFullCardText>
      </StyledOpenFullCardWrapper>
    </StyledCard>
  );
}
