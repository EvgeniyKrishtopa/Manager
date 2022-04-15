import React from 'react';

import styled from 'styled-components/native';
import Article from 'modules/Articles/components/Article/Index';
import Contact from 'modules/Contacts/components/Contact/Index';
import { IArticleManageData, IAvatarConfig, ICreateContactData } from 'typings/interfaces';

interface IRecentItems {
  recentArticle: IArticleManageData | null;
  recentContact: ICreateContactData | null;
  userData: any;
  avatars: IAvatarConfig[];
}

const StyledWrapper = styled.View`
  align-items: center;
`;

const StyledNewItems = styled.Text`
  color: ${(props) => props.theme.colors.mainTextColor};
  font-size: 20px;
  font-family: ${(props) => props.theme.fonts.primaryBold};
  font-weight: bold;
  margin: 20px 0 15px;
`;

const StyledScrollView = styled.ScrollView`
  width: 100%;
`;

export default function RecentItems({
  recentArticle,
  recentContact,
  userData,
  avatars,
}: IRecentItems) {
  return (
    <StyledWrapper>
      <StyledNewItems>Recent Articles/Contacts:</StyledNewItems>
      <StyledScrollView>
        {recentArticle && <Article item={recentArticle} userId={userData.uid} />}
        {recentContact && <Contact item={recentContact} userId={userData.uid} avatars={avatars} />}
      </StyledScrollView>
    </StyledWrapper>
  );
}
