import React from 'react';

import { SignUpAction } from 'redux/reducers/usersReducer';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import FormLogin from 'components/Forms/FormLogin/FormLogin';
import { StyledTextInfo, StyledInfoWrapper, StyledSignUpIconHolder, StyledTitle } from './SignIn';
import { StyledScreenWrapper } from 'components/Styled/Index';
import { useNavigationHook } from 'utils/Hooks/useNavigationHook';
import TouchableDismissWrappper from 'utils/TouchableDismissWrappper';
import { useDispatchHook } from 'utils/Hooks/useDispatchHook';
import { useGetOrientation } from 'utils/Hooks/useGetOrientation';
import { IAuthData } from 'typings/interfaces';
import { Screens, AuthInfo } from 'typings/enums';

function SignUp() {
  const [navigation] = useNavigationHook(Screens.SignUp);
  const [dispatch] = useDispatchHook();
  const { orientation } = useGetOrientation();
  const theme = useTheme();

  const goBack = () => {
    navigation.goBack();
  };

  const onSignUpSubmitData = (values: IAuthData) => {
    dispatch(SignUpAction(values));
  };

  return (
    <TouchableDismissWrappper>
      <StyledScreenWrapper orientation={orientation}>
        <StyledInfoWrapper orientation={orientation}>
          <StyledSignUpIconHolder onPress={goBack} orientation={orientation}>
            <Ionicons name="arrow-back" size={40} color={theme.colors.primary} />
          </StyledSignUpIconHolder>
          <StyledTextInfo>{AuthInfo.GoBack}</StyledTextInfo>
        </StyledInfoWrapper>
        <StyledTitle>{AuthInfo.SignUp}</StyledTitle>
        <FormLogin onSignUpSubmitData={onSignUpSubmitData} />
      </StyledScreenWrapper>
    </TouchableDismissWrappper>
  );
}

export default SignUp;
