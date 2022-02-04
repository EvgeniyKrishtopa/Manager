import React from 'react';

import { DeleteArticleAction } from 'redux/reducers/articlesUserReducer';
import styled from 'styled-components/native';
import moment from 'moment';
import { useTheme } from 'styled-components';
import { useDispatchHook } from 'utils/Hooks/useDispatchHook';
import { AntDesign } from '@expo/vector-icons';
import { FullArticleView } from 'typings/enums';

const StyledArticle = styled.View`
  width: 90%;
  margin: 0 auto 10px;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  background-color: ${(props) => props.theme.colors.mainBackgroundColor};
  min-height: 130px;
`;

const StyledArticleTitle = styled.Text`
  font-size: 18px;
  padding: 15px 55px 15px 15px;
  color: ${(props) => props.theme.colors.secondaryTextColor};
  font-family: ${(props) => props.theme.fonts.secondaryBold};
  margin-bottom: 15px;
  background-color: ${(props) => props.theme.colors.primary};
`;
const StyledArticleDescription = styled.Text`
  font-size: 14px;
  color: ${(props) => props.theme.colors.primary};
  font-family: ${(props) => props.theme.fonts.primaryMedium};
  margin-bottom: 10px;
  padding: 0 15px;
`;

const StyledArticleInfo = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.colors.mainTextColor};
  font-family: ${(props) => props.theme.fonts.primaryMedium};
  padding: 0 15px 15px;
`;

const StyledIconDeleteWrapper = styled.TouchableOpacity`
  position: absolute;
  top: 15px;
  right: 15px;
`;

const StyledDatePost = styled.Text`
  font-size: 14px;
  margin-bottom: 15px;
  padding-left: 15px;
  font-family: ${(props) => props.theme.fonts.secondaryBold};
  color: ${(props) => props.theme.colors.mainTextColor};
`;

const StyledOpenFullArticleWrapper = styled.TouchableOpacity`
  padding: 5px 12px;
  border-radius: 4px;
  background: transparent;
  border-color: ${(props) => props.theme.colors.primary};
  border-width: 1px;
  border-style: solid;
  position: absolute;
  bottom: 10px;
  right: 15px;
`;

const StyledOpenFullArticleText = styled.Text`
  text-align: center;
  font-size: 14px;
  color: ${(props) => props.theme.colors.mainTextColor};
  font-family: ${(props) => props.theme.fonts.secondaryBold};
`;

interface IArtcileProps {
  item: any;
  userId: string;
  openFullScreen: (id: string) => void;
}

export default function Article({ item, userId, openFullScreen }: IArtcileProps) {
  const theme = useTheme();
  const [dispatch] = useDispatchHook();

  const { title, description, info, created, id } = item.item;

  const deleteArticleHandler = () => {
    dispatch(DeleteArticleAction({ id, userId }));
  };

  const openFullArticleHandler = () => {
    openFullScreen(id);
  };

  return (
    <StyledArticle>
      {title?.length ? (
        <StyledArticleTitle ellipsizeMode={'tail'} numberOfLines={1}>
          {title}
        </StyledArticleTitle>
      ) : null}
      {description?.length ? (
        <StyledArticleDescription ellipsizeMode={'tail'} numberOfLines={2}>
          {description}
        </StyledArticleDescription>
      ) : null}
      {info?.length ? (
        <StyledArticleInfo ellipsizeMode={'tail'} numberOfLines={4}>
          {info}
        </StyledArticleInfo>
      ) : null}
      {created ? (
        <StyledDatePost>{moment(created).format('MMMM Do YYYY, h:mm a')}</StyledDatePost>
      ) : null}
      <StyledIconDeleteWrapper onPress={deleteArticleHandler}>
        <AntDesign name="delete" size={24} color={theme.colors.secondaryBackgroundColor} />
      </StyledIconDeleteWrapper>
      <StyledOpenFullArticleWrapper onPress={openFullArticleHandler}>
        <StyledOpenFullArticleText>{FullArticleView.OpenArticle}</StyledOpenFullArticleText>
      </StyledOpenFullArticleWrapper>
    </StyledArticle>
  );
}
