import React from 'react';

import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
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
import { useLanguage } from 'utils/Hooks/useLanguage';
import { Moment } from 'moment';
import { IDeleteArticleData } from 'typings/interfaces';
import { TranslationInfo } from 'typings/enums';
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
  const { language } = useSelector((state: RootState) => state.users);

  const theme = useTheme();
  const [dispatch] = useDispatchHook();
  const i18n = useLanguage();

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
      {created ? (
        <StyledDatePost isFrom={isFrom}>{getFormattedDate(created, language)}</StyledDatePost>
      ) : null}
      <StyledIconDeleteWrapper onPress={deleteItemHandler}>
        <AntDesign name="delete" size={24} color={theme.colors.secondaryBackgroundColor} />
      </StyledIconDeleteWrapper>
      <StyledOpenFullCardWrapper onPress={openFullItemHandler}>
        <StyledOpenFullCardText>{i18n.t(TranslationInfo.Open)}</StyledOpenFullCardText>
      </StyledOpenFullCardWrapper>
    </StyledCard>
  );
}
