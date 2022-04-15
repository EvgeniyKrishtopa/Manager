import React, { memo } from 'react';

import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import ItemWrapper from 'components/ItemWrapper/Index';
import { IDeleteArticleData, IItemProps } from 'typings/interfaces';
import { DeleteArticleAction } from 'redux/reducers/articlesUserReducer';
import { useDispatchHook } from 'utils/Hooks/useDispatchHook';
import { useNavigationHook } from 'utils/Hooks/useNavigationHook';
import { useListAnimate } from 'utils/Hooks/useListAnimate';
import { Screens } from 'typings/enums';

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

function Article({ item, userId, index = 0 }: IItemProps) {
  const { title, description, info, created, id } = item;
  const [dispatch] = useDispatchHook();
  const [navigation] = useNavigationHook(Screens.Articles);

  const style = useListAnimate(index);

  const deleteArticle = ({ id, userId }: IDeleteArticleData) => {
    dispatch(DeleteArticleAction({ id, userId }));
  };

  const openFullScreen = () => {
    const article = item;

    const params = { article };
    //@ts-ignore
    navigation.navigate(Screens.FullViewArticle, params);
  };

  return (
    <Animated.View style={[style]}>
      <ItemWrapper
        id={id}
        userId={userId}
        openFullScreen={openFullScreen}
        deleteArticle={deleteArticle}
        isFrom="article"
        created={created}
      >
        <>
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
        </>
      </ItemWrapper>
    </Animated.View>
  );
}

export default memo(Article);
