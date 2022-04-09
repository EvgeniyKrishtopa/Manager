import React, { useState, useEffect } from 'react';

import styled from 'styled-components/native';
import InputScrollView from 'react-native-input-scroll-view';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigationHook } from 'utils/Hooks/useNavigationHook';
import { BottomTabStackParamList } from 'navigations/Index';
import View from './components/View/Index';
import { withBackgroundImage } from 'utils/Hocs/withBackgroundImage';
import ErrorBoundary from 'utils/ErrorBoundary';
import { IArticleManageData } from 'typings/interfaces';
import { FullArticleView, Screens, Errors } from 'typings/enums';

const StyledWrapper = styled.SafeAreaView`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  position: relative;
`;

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
export type ArticleEditType = Pick<
  IArticleManageData,
  'id' | 'title' | 'description' | 'info' | 'userId'
>;
interface INavProp {
  navigation: NavProps;
  route: RouteProps;
}

function FullViewArticle({ route }: INavProp) {
  const [article, setArticle] = useState<null | IArticleManageData>(null);
  const [titleArticle, setTitleArticle] = useState<string>('');
  const [descriptionArticle, setDescriptionArticle] = useState<string>('');
  const [infoArticle, setInfoArticle] = useState<string>('');

  const [navigation] = useNavigationHook(Screens.FullViewArticle);

  const onEditScreenOpen = () => {
    if (article) {
      const params = { article };
      //@ts-ignore
      navigation.navigate(Screens.EditArticle, params);
    }
  };

  useEffect(() => {
    //@ts-ignore
    const { article } = route.params;
    if (article) {
      setArticle(article);

      const { title, description, info } = article;

      setTitleArticle(title);
      setDescriptionArticle(description);
      setInfoArticle(info);
    }
  }, [route]);

  return (
    <ErrorBoundary message={Errors.Error}>
      <InputScrollView>
        <StyledWrapper>
          <View title={titleArticle} description={descriptionArticle} info={infoArticle} />
          <StyledOpenFullArticleWrapper onPress={onEditScreenOpen}>
            <StyledOpenFullArticleText>{FullArticleView.EditArticle}</StyledOpenFullArticleText>
          </StyledOpenFullArticleWrapper>
        </StyledWrapper>
      </InputScrollView>
    </ErrorBoundary>
  );
}

export default withBackgroundImage(FullViewArticle);
