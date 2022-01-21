import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import LoginForm from 'components/Forms/LoginForm';
import ErrorAlert from 'components/ErrorAlert/Index';
import { StyledTextInfo, StyledInfoWrapper, StyledSignUpIconHolder, StyledTitle } from './SignIn';
import { Screens } from 'typings/enums';
import { useNavigationHook } from 'utils/Hooks/useNavigationHook';
import { withBackgroundImage } from 'utils/Hocs/withBackgroundImage';

function SignUp() {
  const [navigation] = useNavigationHook(Screens.SignUp);
  const theme = useTheme();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <StyledInfoWrapper>
        <StyledSignUpIconHolder onPress={goBack}>
          <Ionicons name="arrow-back" size={40} color={theme.colors.primary} />
        </StyledSignUpIconHolder>
        <StyledTextInfo>Go Back</StyledTextInfo>
      </StyledInfoWrapper>
      <StyledTitle>Sign Up</StyledTitle>
      <LoginForm SignUp />
      <ErrorAlert />
    </>
  );
}

export default withBackgroundImage(SignUp);
