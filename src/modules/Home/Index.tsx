import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { FetchArticlesAction } from 'redux/reducers/articlesUserReducer';
import { FetchContactsAction } from 'redux/reducers/contactsUserReducer';
import styled from 'styled-components/native';
import TopInfo from './components/TopInfo/Index';
import GoTo from './components/GoTo/Index';
import ImagePlaceholder from './components/ImagePlaceholder/Index';
import { StyledItemsWrapper, OrientationProps } from 'components/Styled/Index';
import RecentItems from './components/RecentItems/Index';
import Loader from 'components/Loader/Index';
import ErrorBoundary from 'utils/ErrorBoundary';
import { useLanguage } from 'utils/Hooks/useLanguage';
import { withBackgroundImage } from 'utils/Hocs/withBackgroundImage';
import { useDispatchHook } from 'utils/Hooks/useDispatchHook';
import { useNavigationHook } from 'utils/Hooks/useNavigationHook';
import { useGetOrientation } from 'utils/Hooks/useGetOrientation';
import { Screens, TranslationInfo } from 'typings/enums';
import { IArticleManageData, ICreateContactData } from 'typings/interfaces';

const StyledScrollView = styled.ScrollView<OrientationProps>`
  padding: ${(props) => (props.orientation === 'Landscape' ? '0 100px' : '0px')};
`;

function Home() {
  const [userName, setUserName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userAvatarUrl, setUserAvatarUrl] = useState<string>('');
  const [recentArticle, setRecentArticle] = useState<IArticleManageData | null>(null);
  const [recentContact, setRecentContact] = useState<ICreateContactData | null>(null);

  const { userData, imageURL } = useSelector((state: RootState) => state.users);
  const { articles } = useSelector((state: RootState) => state.articles);
  const { contacts, avatars } = useSelector((state: RootState) => state.contacts);

  const [navigation] = useNavigationHook(Screens.Home);
  const [dispatch] = useDispatchHook();
  const { orientation } = useGetOrientation();
  const i18n = useLanguage();

  const { displayName } = userData;

  const onNavigateAddHandler = () => {
    navigation.navigate(Screens.Add);
  };

  const onNavigateSettingsHandler = () => {
    navigation.navigate(Screens.Settings);
  };

  useEffect(() => {
    imageURL && setUserAvatarUrl(imageURL);
  }, [imageURL]);

  useEffect(() => {
    setUserName(displayName);
  }, [displayName]);

  useEffect(() => {
    if (userData) {
      dispatch(FetchArticlesAction({ id: userData.uid }));
      dispatch(FetchContactsAction({ id: userData.uid }));
    }
  }, [dispatch, userData]);

  useEffect(() => {
    if (userData) {
      articles?.length ? setRecentArticle(articles[0]) : setRecentArticle(null);
      setTimeout(() => {
        articles && setIsLoading(false);
      }, 1500);
    }
  }, [articles, userData]);

  useEffect(() => {
    contacts?.length && userData ? setRecentContact(contacts[0]) : setRecentContact(null);
  }, [contacts, userData]);

  const isRecentItemExist = (recentContact || recentArticle) && userData;

  return (
    <ErrorBoundary message={i18n.t(TranslationInfo.Error)}>
      <StyledScrollView orientation={orientation}>
        <StyledItemsWrapper>
          <TopInfo
            name={userName}
            avatar={userAvatarUrl}
            onNavigateHandler={onNavigateSettingsHandler}
          />
          {isLoading && <Loader />}
          {!isRecentItemExist && !isLoading && <ImagePlaceholder />}
          {<GoTo onNavigateHandler={onNavigateAddHandler} />}
          {isRecentItemExist && !isLoading && (
            <RecentItems
              userData={userData}
              recentArticle={recentArticle}
              recentContact={recentContact}
              avatars={avatars}
            />
          )}
        </StyledItemsWrapper>
      </StyledScrollView>
    </ErrorBoundary>
  );
}

export default withBackgroundImage(Home);
