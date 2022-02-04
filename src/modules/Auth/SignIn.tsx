import React from 'react';

import { FontAwesome } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { useTheme } from 'styled-components';
import { StyledScreenWrapper } from 'components/Styled/Index';
import LoginForm from 'components/Forms/LoginForm';
import { Screens, AuthInfo } from 'typings/enums';
import { withNotification } from 'utils/Hocs/withNotification';
import { useNavigationHook } from 'utils/Hooks/useNavigationHook';
import TouchableDismissWrappper from 'utils/TouchableDismissWrappper';

export const StyledTextInfo = styled.Text`
  font-size: 18px;
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

  const onPressNavigationHandler = () => {
    navigation.navigate(Screens.SignUp);
  };

  return (
    <TouchableDismissWrappper>
      <StyledScreenWrapper>
        <StyledInfoWrapper>
          <StyledTextInfo>{AuthInfo.VisitFirst}</StyledTextInfo>
          <StyledSignUpIconHolder onPress={onPressNavigationHandler}>
            <FontAwesome name="sign-in" size={40} color={theme.colors.primary} />
          </StyledSignUpIconHolder>
        </StyledInfoWrapper>
        <StyledTitle>{AuthInfo.SignIn}</StyledTitle>
        <LoginForm SignIn />
      </StyledScreenWrapper>
    </TouchableDismissWrappper>
  );
}

export default withNotification({
  isNotificationSuccessVisible: false,
  isNotificationErrorVisible: true,
})(SignIn);
