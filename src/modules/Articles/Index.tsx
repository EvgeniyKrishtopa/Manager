import React, { useState, useCallback } from 'react';

import { FlatList, RefreshControl } from 'react-native';
import { RootState } from 'redux/store';
import { useSelector } from 'react-redux';
import { useTheme } from 'styled-components';
import { useDispatchHook } from 'utils/Hooks/useDispatchHook';
import { FetchArticlesAction } from 'redux/reducers/articlesUserReducer';
import { StyledTitle, StyledItemsWrapper, StyledNoItemsYet } from 'components/Styled/Index';
import Article from './components/Article/Index';
import { withBackgroundImage } from 'utils/Hocs/withBackgroundImage';
import { useLanguage } from 'utils/Hooks/useLanguage';
import ErrorBoundary from 'utils/ErrorBoundary';
import { TranslationInfo } from 'typings/enums';

function Articles() {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const { userData } = useSelector((state: RootState) => state.users);
  const { articles } = useSelector((state: RootState) => state.articles);

  const [dispatch] = useDispatchHook();
  const theme = useTheme();
  const i18n = useLanguage();

  const getDataRequest = useCallback(() => {
    dispatch(FetchArticlesAction({ id: userData.uid }));
  }, [dispatch, userData]);

  const fetchData = () => {
    getDataRequest();
    setIsFetching(false);
  };

  const refreshFetchData = () => {
    setIsFetching(true);
    fetchData();
  };

  return (
    <ErrorBoundary message={i18n.t(TranslationInfo.Error)}>
      <StyledItemsWrapper>
        <StyledTitle>{i18n.t(TranslationInfo.Articles)}</StyledTitle>
        <FlatList
          data={articles}
          renderItem={({ item, index }) => (
            <Article item={item} userId={userData.uid} index={index} />
          )}
          //@ts-ignore
          keyExtractor={(item) => item?.created?.toString()}
          progressViewOffset={100}
          initialNumToRender={4}
          refreshControl={
            <RefreshControl
              tintColor={theme.colors.primary}
              refreshing={isFetching}
              onRefresh={refreshFetchData}
            />
          }
          ListEmptyComponent={
            <StyledNoItemsYet>{i18n.t(TranslationInfo.NoArticles)}</StyledNoItemsYet>
          }
        />
      </StyledItemsWrapper>
    </ErrorBoundary>
  );
}

export default withBackgroundImage(Articles);
