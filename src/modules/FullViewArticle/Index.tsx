import React, { useState, useEffect } from 'react';

import { RootState } from 'redux/store';
import { useSelector } from 'react-redux';
import { EditArticleAction } from 'redux/reducers/articlesUserReducer';
import styled from 'styled-components/native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyledWrapper } from 'modules/Articles/Index';
import View from './components/View/Index';
import EditArticleForm from './components/Form/Index';
import { useDispatchHook } from 'utils/Hooks/useDispatchHook';
import { withBackgroundImage } from 'utils/Hocs/withBackgroundImage';
import { IArticleManageData } from 'typings/interfaces';
import { FullArticleView, Screens } from 'typings/enums';
import TouchableDismissWrappper from 'utils/TouchableDismissWrappper';
import { BottomTabStackParamList } from 'navigations/Index';

const StyledOpenFullArticleWrapper = styled.TouchableOpacity`
  width: 180px;
  padding: 5px 12px;
  border-radius: 4px;
  background: ${(props) => props.theme.colors.primary};
  border-color: ${(props) => props.theme.colors.primary};
  border-width: 1px;
  border-style: solid;
  margin: 0 auto 20px;
`;

const StyledOpenFullArticleText = styled.Text`
  text-align: center;
  font-size: 16px;
  color: ${(props) => props.theme.colors.secondaryTextColor};
  font-family: ${(props) => props.theme.fonts.secondaryBold};
`;

type RouteProps = RouteProp<BottomTabStackParamList, Screens.FullViewArticle>;
type NavProps = StackNavigationProp<BottomTabStackParamList, Screens.FullViewArticle>;

interface IProp {
  navigation: NavProps;
  route: RouteProps;
}

function FullViewArticle({ route, navigation }: IProp) {
  const [isEditingMode, setIsEditingMode] = useState<boolean>(false);

  const [titleArticle, setTitleArticle] = useState<string>('');
  const [descriptionArticle, setDescriptionArticle] = useState<string>('');
  const [infoArticle, setInfoArticle] = useState<string>('');
  const [idArticle, setIdArticle] = useState<string>('');
  const { userData } = useSelector((state: RootState) => state.users);
  const { loadingArticle } = useSelector((state: RootState) => state.articles);
  const [dispatch] = useDispatchHook();

  const saveEditedValues = () => {
    const { uid } = userData;
    const config: IArticleManageData = {
      id: idArticle,
      title: titleArticle,
      description: descriptionArticle,
      info: infoArticle,
      userId: uid,
    };
    dispatch(EditArticleAction(config));
  };

  const saveArticleChangesHandler = () => {
    setIsEditingMode(true);
  };

  const goBackHandler = () => {
    navigation.goBack();
  };

  useEffect(() => {
    //@ts-ignore
    const { article } = route.params;
    //@ts-ignore
    const { title, description, info, id } = article;
    setTitleArticle(title);
    setDescriptionArticle(description);
    setInfoArticle(info);
    setIdArticle(id);
  }, [route]);

  useEffect(() => {
    if (loadingArticle) {
      setIsEditingMode(false);
    }
  }, [loadingArticle]);

  return (
    <TouchableDismissWrappper>
      <StyledWrapper>
        {isEditingMode ? (
          <EditArticleForm
            title={titleArticle}
            description={descriptionArticle}
            info={infoArticle}
            setTitleArticle={setTitleArticle}
            setDescriptionArticle={setDescriptionArticle}
            setInfoArticle={setInfoArticle}
          />
        ) : (
          <View title={titleArticle} description={descriptionArticle} info={infoArticle} />
        )}
        <StyledOpenFullArticleWrapper
          onPress={isEditingMode ? saveEditedValues : saveArticleChangesHandler}
        >
          <StyledOpenFullArticleText>
            {isEditingMode ? FullArticleView.SaveChanges : FullArticleView.EditArticle}
          </StyledOpenFullArticleText>
        </StyledOpenFullArticleWrapper>

        <StyledOpenFullArticleWrapper onPress={goBackHandler}>
          <StyledOpenFullArticleText>{FullArticleView.GoBack}</StyledOpenFullArticleText>
        </StyledOpenFullArticleWrapper>
      </StyledWrapper>
    </TouchableDismissWrappper>
  );
}

export default withBackgroundImage(FullViewArticle);
