import React from 'react';

import { FontAwesome } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { useTheme } from 'styled-components';
import LoginForm from 'components/Forms/LoginForm';
import ErrorAlert from 'components/ErrorAlert/Index';

import { Screens } from 'typings/enums';
import { useNavigationHook } from 'utils/Hooks/useNavigationHook';
import { withBackgroundImage } from 'utils/Hocs/withBackgroundImage';

export const StyledTextInfo = styled.Text`
  font-size: 20px;
  text-align: center;
  font-family: ${(props) => props.theme.fonts.primaryMedium};
  color: ${(props) => props.theme.colors.secondaryTextColor};
`;

export const StyledInfoWrapper = styled.View`
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  padding: 0 20px;
  justify-content: center;
  align-items: center;
`;

export const StyledSignUpIconHolder = styled.TouchableOpacity`
  position: absolute;
  top: 30px;
  left: 50%;
`;

export const StyledTitle = styled.Text`
  color: ${(props) => props.theme.colors.secondaryTextColor};
  font-family: ${(props) => props.theme.fonts.primaryBold};
  font-weight: bold;
  font-size: 22px;
  text-transform: uppercase;
  margin-bottom: 10px;
`;

function SignIn() {
  const [navigation] = useNavigationHook(Screens.SignIn);
  const theme = useTheme();

  const onPressHandler = () => {
    navigation.navigate(Screens.SignUp);
  };

  return (
    <>
      <StyledInfoWrapper>
        <StyledTextInfo>Visit first? You need Sign Up! </StyledTextInfo>
        <StyledSignUpIconHolder onPress={onPressHandler}>
          <FontAwesome name="sign-in" size={40} color={theme.colors.primary} />
        </StyledSignUpIconHolder>
      </StyledInfoWrapper>
      <StyledTitle>Sign In</StyledTitle>
      <LoginForm SignIn />
      <ErrorAlert />
    </>
  );
}

export default withBackgroundImage(SignIn);
