import React, { useState } from 'react';

import { Animated } from 'react-native';
import { RootState } from 'redux/store';
import { useSelector } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components/native';
import { useTheme } from 'styled-components';
import { TabView, SceneMap, Route } from 'react-native-tab-view';
import TouchableDismissWrappper from 'utils/TouchableDismissWrappper';
import Creator from './components/Creator/Index';
import { withNotification } from 'utils/Hocs/withNotification';
import ErrorBoundary from 'utils/ErrorBoundary';
import { AddScreenTexts, Errors } from 'typings/enums';
import { StyledTitle } from 'components/Styled/Index';

const Wrapper = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.secondaryBackgroundColor};
`;
const StyledTabBar = styled.View`
  display: flex;
  flex-direction: row;
  background-color: ${(props) => props.theme.colors.primary};
  margin-bottom: 10px;
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

  const FirstRoute = () => <Creator id={id} type="article" />;
  const SecondRoute = () => <Creator id={id} type="contact" />;

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
    <ErrorBoundary message={Errors.Error}>
      <TouchableDismissWrappper>
        <Wrapper>
          <StyledTitle>Add a New:</StyledTitle>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={renderTabBar}
          />
        </Wrapper>
      </TouchableDismissWrappper>
    </ErrorBoundary>
  );
}

export default compose(
  withNotification({
    isNotificationErrorVisible: true,
    isNotificationSuccessVisible: true,
  })(Add),
);
