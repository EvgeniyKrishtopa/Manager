import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import LoginForm from 'components/Forms/LoginForm';
import ErrorAlert from 'components/ErrorAlert/Index';
import { StyledTextInfo, StyledInfoWrapper, StyledSignUpIconHolder, StyledTitle } from './SignIn';
import { Screens } from 'typings/enums';
import { useNavigationHook } from 'utils/hooks/useNavigationHook';
import { WithBackgroundImage } from 'utils/Hocs/withBackgroundImage';

function SignUp() {
  const [navigation] = useNavigationHook(Screens.SignUp);
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <StyledInfoWrapper>
        <StyledSignUpIconHolder onPress={goBack}>
          <Ionicons name="arrow-back" size={40} color="#519259" />
        </StyledSignUpIconHolder>
        <StyledTextInfo>Go Back</StyledTextInfo>
      </StyledInfoWrapper>
      <StyledTitle>Sign Up</StyledTitle>
      <LoginForm SignUp />
      <ErrorAlert />
    </>
  );
}

export default WithBackgroundImage(SignUp);
