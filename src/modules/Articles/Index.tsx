import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { RootState } from 'redux/store';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { useTheme } from 'styled-components';
import { useDispatchHook } from 'utils/Hooks/useDispatchHook';
import { useNavigationHook } from 'utils/Hooks/useNavigationHook';
import { FetchArticlesAction } from 'redux/reducers/articlesUserReducer';
import { withBackgroundImage } from 'utils/Hocs/withBackgroundImage';
import { StyledTitle } from 'components/Styled/Index';
import Article from './components/Article/Index';
import Loader from 'components/Loader/Index';
import { IArticleManageData } from 'typings/interfaces';
import { Screens } from 'typings/enums';

export const StyledWrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  position: relative;
`;

const StyledNoArticlesYet = styled.Text`
  font-size: 20px;
  text-align: center;
  color: ${(props) => props.theme.colors.primary};
  font-family: ${(props) => props.theme.fonts.secondaryBold};
`;

function Articles() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [articlesData, setArticlesData] = useState<Array<IArticleManageData> | []>([]);
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
    const article = articles.find((item: IArticleManageData) => item.id === id);

    const params = { article };
    //@ts-ignore
    navigation.navigate(Screens.FullViewArticle, params);
  };

  useEffect(() => {
    if (userData) {
      getDataRequest();
    }
  }, [userData, dispatch, getDataRequest]);

  useEffect(() => {
    setArticlesData(articles);
    setIsLoading(false);
  }, [articles]);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  if (isLoading && !articlesData.length) {
    return <Loader />;
  }

  return (
    <StyledWrapper>
      <StyledTitle>Articles</StyledTitle>
      <FlatList
        data={articlesData}
        renderItem={(item) => (
          <Article item={item} userId={userData.uid} openFullScreen={openFullScreen} />
        )}
        keyExtractor={(item) => item.title}
        progressViewOffset={100}
        refreshControl={
          <RefreshControl
            tintColor={theme.colors.primary}
            refreshing={isFetching}
            onRefresh={refreshFetchData}
          />
        }
        ListEmptyComponent={<StyledNoArticlesYet>No Articles Yet!</StyledNoArticlesYet>}
      />
    </StyledWrapper>
  );
}

export default withBackgroundImage(Articles);
