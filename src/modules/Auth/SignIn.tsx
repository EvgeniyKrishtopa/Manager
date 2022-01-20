import React from 'react';

import { FontAwesome } from '@expo/vector-icons';
import styled from 'styled-components/native';
import LoginForm from 'components/Forms/LoginForm';
import ErrorAlert from 'components/ErrorAlert/Index';

import { Screens } from 'typings/enums';
import { useNavigationHook } from 'utils/hooks/useNavigationHook';
import { WithBackgroundImage } from 'utils/Hocs/withBackgroundImage';

export const StyledTextInfo = styled.Text`
  font-size: 20px;
  text-align: center;
  color: #fff;
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
  color: #fff;
  font-weight: bold;
  font-size: 22px;
  text-transform: uppercase;
  margin-bottom: 10px;
`;

function SignIn() {
  const [navigation] = useNavigationHook(Screens.SignIn);

  const onPressHandler = () => {
    navigation.navigate(Screens.SignUp);
  };

  return (
    <>
      <StyledInfoWrapper>
        <StyledTextInfo>Visit first? You need Sign Up! </StyledTextInfo>
        <StyledSignUpIconHolder onPress={onPressHandler}>
          <FontAwesome name="sign-in" size={40} color="#519259" />
        </StyledSignUpIconHolder>
      </StyledInfoWrapper>
      <StyledTitle>Sign In</StyledTitle>
      <LoginForm SignIn />
      <ErrorAlert />
    </>
  );
}

export default WithBackgroundImage(SignIn);
