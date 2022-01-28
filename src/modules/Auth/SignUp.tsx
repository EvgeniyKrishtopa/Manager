import React from 'react';

import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import LoginForm from 'components/Forms/LoginForm';
import {
  StyledWrapper,
  StyledTextInfo,
  StyledInfoWrapper,
  StyledSignUpIconHolder,
  StyledTitle,
} from './SignIn';
import { Screens, AuthInfo } from 'typings/enums';
import { withNotification } from 'utils/Hocs/withNotification';
import { useNavigationHook } from 'utils/Hooks/useNavigationHook';
import TouchableDismissWrappper from 'utils/TouchableDismissWrappper';

function SignUp() {
  const [navigation] = useNavigationHook(Screens.SignUp);
  const theme = useTheme();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableDismissWrappper>
      <StyledWrapper>
        <StyledInfoWrapper>
          <StyledSignUpIconHolder onPress={goBack}>
            <Ionicons name="arrow-back" size={40} color={theme.colors.primary} />
          </StyledSignUpIconHolder>
          <StyledTextInfo>{AuthInfo.GoBack}</StyledTextInfo>
        </StyledInfoWrapper>
        <StyledTitle>{AuthInfo.SignUp}</StyledTitle>
        <LoginForm SignUp />
      </StyledWrapper>
    </TouchableDismissWrappper>
  );
}

export default withNotification({
  isNotificationSuccessVisible: false,
  isNotificationErrorVisible: true,
})(SignUp);
