import React, { useState, useEffect } from 'react';

import styled from 'styled-components/native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootState } from 'redux/store';
import { useSelector } from 'react-redux';
import Loader from 'components/Loader/Index';
import FormArticle from 'components/Forms/FormArticle/FormArticle';
import { withBackgroundImage } from 'utils/Hocs/withBackgroundImage';
import { IArticleManageData } from 'typings/interfaces';
import { Screens } from 'typings/enums';
import TouchableDismissWrappper from 'utils/TouchableDismissWrappper';
import ErrorBoundary from 'utils/ErrorBoundary';
import { Errors } from 'typings/enums';
import { BottomTabStackParamList } from 'navigations/Index';

const StyledWrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  position: relative;
  padding: 20px;
`;

type RouteProps = RouteProp<BottomTabStackParamList, Screens.FullViewArticle>;
type NavProps = StackNavigationProp<BottomTabStackParamList, Screens.FullViewArticle>;
export type ArticleEditType = Pick<
  IArticleManageData,
  'id' | 'title' | 'description' | 'info' | 'userId'
>;
interface INavProp {
  navigation: NavProps;
  route: RouteProps;
}

function EditArticle({ route }: INavProp) {
  const [article, setArticle] = useState<null | IArticleManageData>(null);

  const { userData } = useSelector((state: RootState) => state.users);

  const id = userData.uid;

  useEffect(() => {
    //@ts-ignore
    const { article } = route.params;
    setArticle(article);
  }, [route]);

  if (!article) {
    return <Loader />;
  }

  return (
    <ErrorBoundary message={Errors.Error}>
      <TouchableDismissWrappper>
        <StyledWrapper>
          <FormArticle id={id} isCreate={false} article={article} />
        </StyledWrapper>
      </TouchableDismissWrappper>
    </ErrorBoundary>
  );
}

export default withBackgroundImage(EditArticle);
