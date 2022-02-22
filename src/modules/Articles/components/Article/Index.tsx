import React from 'react';

import styled from 'styled-components/native';
import ItemWrapper from 'components/ItemWrapper/Index';
import { IItemProps } from 'typings/interfaces';

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

export default function Article({ item, userId, openFullScreen }: IItemProps) {
  const { title, description, info, created, id } = item.item;

  return (
    <ItemWrapper
      id={id}
      userId={userId}
      openFullScreen={openFullScreen}
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
  );
}
