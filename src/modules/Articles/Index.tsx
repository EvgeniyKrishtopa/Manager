import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { RootState } from 'redux/store';
import { useSelector } from 'react-redux';
import { useTheme } from 'styled-components';
import { useDispatchHook } from 'utils/Hooks/useDispatchHook';
import { useNavigationHook } from 'utils/Hooks/useNavigationHook';
import { FetchArticlesAction } from 'redux/reducers/articlesUserReducer';
import { StyledTitle, StyledItemsWrapper, StyledNoItemsYet } from 'components/Styled/Index';
import Article from './components/Article/Index';
import Loader from 'components/Loader/Index';
import { withBackgroundImage } from 'utils/Hocs/withBackgroundImage';
import ErrorBoundary from 'utils/ErrorBoundary';
import { IArticleManageData } from 'typings/interfaces';
import { Screens, Errors } from 'typings/enums';

function Articles() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const { userData } = useSelector((state: RootState) => state.users);
  const { articles } = useSelector((state: RootState) => state.articles);
  const [navigation] = useNavigationHook(Screens.Articles);
  const [dispatch] = useDispatchHook();
  const theme = useTheme();

  const getDataRequest = () => dispatch(FetchArticlesAction({ id: userData.uid }));

  const fetchData = () => {
    getDataRequest();
    setIsFetching(false);
  };

  const refreshFetchData = () => {
    setIsFetching(true);
    fetchData();
  };

  const openFullScreen = (id: string) => {
    const article = articles?.find((item: IArticleManageData) => item.id === id);

    const params = { article };
    //@ts-ignore
    navigation.navigate(Screens.FullViewArticle, params);
  };

  useEffect(() => {
    if (userData) {
      getDataRequest();
    }
  }, [userData, dispatch]);

  useEffect(() => {
    setIsLoading(false);
  }, [articles]);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  if (isLoading && !articles?.length) {
    return <Loader />;
  }

  return (
    <ErrorBoundary message={Errors.Error}>
      <StyledItemsWrapper>
        <StyledTitle>Articles</StyledTitle>
        <FlatList
          data={articles}
          renderItem={(item) => (
            <Article item={item} userId={userData.uid} openFullScreen={openFullScreen} />
          )}
          keyExtractor={(item) => item?.created?.toString()}
          progressViewOffset={100}
          refreshControl={
            <RefreshControl
              tintColor={theme.colors.primary}
              refreshing={isFetching}
              onRefresh={refreshFetchData}
            />
          }
          ListEmptyComponent={<StyledNoItemsYet>No Articles Yet!</StyledNoItemsYet>}
        />
      </StyledItemsWrapper>
    </ErrorBoundary>
  );
}

export default withBackgroundImage(Articles);
