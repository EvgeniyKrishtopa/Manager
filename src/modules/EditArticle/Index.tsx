import React, { useState, useEffect } from 'react';

import styled from 'styled-components/native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabStackParamList } from 'navigations/Index';
import { RootState } from 'redux/store';
import { useSelector } from 'react-redux';
import { clearLoadingArticle, EditArticleAction } from 'redux/reducers/articlesUserReducer';
import Loader from 'components/Loader/Index';
import FormArticle from 'components/Forms/FormArticle/FormArticle';
import TouchableDismissWrappper from 'utils/TouchableDismissWrappper';
import ErrorBoundary from 'utils/ErrorBoundary';
import { useDispatchHook } from 'utils/Hooks/useDispatchHook';
import { useNavigationHook } from 'utils/Hooks/useNavigationHook';
import { Errors, Screens } from 'typings/enums';
import { IArticleManageData } from 'typings/interfaces';

const StyledWrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.secondaryBackgroundColor};
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
  const [isForSubmitting, setIsFormSubmitting] = useState<boolean>(false);
  const [articleEdit, setArticleEdit] = useState<null | IArticleManageData>(null);

  const { userData } = useSelector((state: RootState) => state.users);
  const { articles, isLoadingArticle } = useSelector((state: RootState) => state.articles);
  const [navigation] = useNavigationHook(Screens.EditArticle);
  const [dispatch] = useDispatchHook();

  const id = userData.uid;

  const formArticleEditSubmit = (dataEdit: ArticleEditType) => {
    dispatch(EditArticleAction(dataEdit));
    setIsFormSubmitting(true);
  };

  const redirectHandler = () => {
    dispatch(clearLoadingArticle());
    const article = articles?.find((item: IArticleManageData) => item.id === articleEdit?.id);
    const params = { article };

    //@ts-ignore
    navigation.navigate(Screens.FullViewArticle, params);
  };

  useEffect(() => {
    //@ts-ignore
    const { article } = route.params;
    setArticleEdit(article);
  }, [route]);

  useEffect(() => {
    if (!isLoadingArticle && articleEdit) {
      redirectHandler();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingArticle, articleEdit]);

  if (!articleEdit) {
    return <Loader />;
  }

  return (
    <ErrorBoundary message={Errors.Error}>
      <TouchableDismissWrappper>
        <StyledWrapper>
          {!isForSubmitting ? (
            <FormArticle
              id={id}
              isCreate={false}
              article={articleEdit}
              formArticleEditSubmit={formArticleEditSubmit}
            />
          ) : (
            <Loader />
          )}
        </StyledWrapper>
      </TouchableDismissWrappper>
    </ErrorBoundary>
  );
}

export default EditArticle;
