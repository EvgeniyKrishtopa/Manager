import React, { useState } from 'react';

import { Animated } from 'react-native';
import { RootState } from 'redux/store';
import { useSelector } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components/native';
import { useTheme } from 'styled-components';
import { TabView, SceneMap, Route } from 'react-native-tab-view';
import { withBackgroundImage } from 'utils/Hocs/withBackgroundImage';
import TouchableDismissWrappper from 'utils/TouchableDismissWrappper';
import CreateArticle from './components/CreateArticle/Index';
import CreateContact from './components/CreateContact/Index';
import { withNotification } from 'utils/Hocs/withNotification';
import { AddScreenTexts, AlertsInfo } from 'typings/enums';
import { StyledTitle } from 'components/Styled/Index';

const StyledTabBar = styled.View`
  display: flex;
  flex-direction: row;
  background-color: ${(props) => props.theme.colors.primary};
`;
const StyledTabItem = styled.TouchableOpacity`
  display: flex;
  flex-basis: 50%;
  align-items: center;
  padding: 16px;
`;
interface IRoutes {
  key: string;
  title: string;
}
interface IProps {
  navigationState: { index: number; routes: Array<IRoutes> };
  position: Animated.AnimatedInterpolation;
}

function Add() {
  const [index, setIndex] = useState<number>(0);
  const [routes, setRoutes] = useState<Array<IRoutes>>([
    { key: AddScreenTexts.First, title: AddScreenTexts.TitleTabFirst },
    { key: AddScreenTexts.Second, title: AddScreenTexts.TitleTabSecond },
  ]);
  const { userData } = useSelector((state: RootState) => state.users);

  const id = userData.uid;

  const theme = useTheme();

  const FirstRoute = () => <CreateArticle id={id} />;
  const SecondRoute = () => <CreateContact />;

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const setIndexHandler = () => {
    if (index) {
      setIndex(0);
    } else {
      setIndex(1);
    }
  };

  const renderTabBar = ({ navigationState, position }: IProps) => {
    const inputRange = navigationState.routes.map((x: Route, i: number) => i);

    return (
      <StyledTabBar>
        {navigationState.routes.map((route: Route, i: number) => {
          const opacity = position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex: number) => (inputIndex === i ? 1 : 0.5)),
          });

          const styles = {
            opacity,
            fontSize: 16,
            color: theme.colors.secondaryTextColor,
            fontFamily: theme.fonts.secondaryMedium,
          };

          return (
            <StyledTabItem onPress={setIndexHandler} key={i}>
              <Animated.Text style={styles}>{route.title}</Animated.Text>
            </StyledTabItem>
          );
        })}
      </StyledTabBar>
    );
  };

  return (
    <TouchableDismissWrappper>
      <>
        <StyledTitle>Add a New:</StyledTitle>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
        />
      </>
    </TouchableDismissWrappper>
  );
}

export default compose(
  withBackgroundImage(Add),
  withNotification({
    textNotification: AlertsInfo.SettingsAction,
    isNotificationErrorVisible: true,
    isNotificationSuccessVisible: true,
  })(Add),
);
