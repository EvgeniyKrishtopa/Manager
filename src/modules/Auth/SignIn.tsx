import React from 'react';

import { SignInAction } from 'redux/reducers/usersReducer';
import { FontAwesome } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { useTheme } from 'styled-components';
import { StyledScreenWrapper, OrientationProps } from 'components/Styled/Index';
import FormLogin from 'components/Forms/FormLogin/FormLogin';
import { useNavigationHook } from 'utils/Hooks/useNavigationHook';
import TouchableDismissWrappper from 'utils/TouchableDismissWrappper';
import { useDispatchHook } from 'utils/Hooks/useDispatchHook';
import { useGetOrientation } from 'utils/Hooks/useGetOrientation';
import { useLanguage } from 'utils/Hooks/useLanguage';
import { IAuthData } from 'typings/interfaces';
import { Screens, TranslationInfo } from 'typings/enums';

export const StyledTextInfo = styled.Text`
  font-size: 18px;
  text-align: center;
  font-family: ${(props) => props.theme.fonts.primaryMedium};
  color: ${(props) => props.theme.colors.secondaryTextColor};
`;

export const StyledInfoWrapper = styled.View<OrientationProps>`
  position: ${(props) => (props.orientation === 'Portrait' ? 'absolute' : 'relative')};
  top: ${(props) => (props.orientation === 'Portrait' ? '60px' : '10px')};
  left: 0;
  width: 100%;
  padding: 0 20px;
  justify-content: center;
  align-items: center;
  flex-direction: ${(props) => (props.orientation === 'Portrait' ? 'column' : 'row')};
`;

export const StyledSignUpIconHolder = styled.TouchableOpacity<OrientationProps>`
  padding-left: ${(props) => (props.orientation === 'Portrait' ? '0px' : '10px')};
`;

export const StyledTitle = styled.Text`
  color: ${(props) => props.theme.colors.secondaryTextColor};
  font-family: ${(props) => props.theme.fonts.primaryBold};
  font-weight: bold;
  font-size: 20px;
  text-transform: uppercase;
  margin-bottom: 5px;
`;

function SignIn() {
  const [navigation] = useNavigationHook(Screens.SignIn);
  const { orientation } = useGetOrientation();
  const [dispatch] = useDispatchHook();
  const i18n = useLanguage();
  const theme = useTheme();

  const onPressNavigationHandler = () => {
    navigation.navigate(Screens.SignUp);
  };

  const onSignInSubmitData = (values: IAuthData) => {
    dispatch(SignInAction(values));
  };

  return (
    <TouchableDismissWrappper>
      <StyledScreenWrapper orientation={orientation}>
        <StyledInfoWrapper orientation={orientation}>
          <StyledTextInfo>{i18n.t(TranslationInfo.VisitFirst)}</StyledTextInfo>
          <StyledSignUpIconHolder onPress={onPressNavigationHandler} orientation={orientation}>
            <FontAwesome name="sign-in" size={40} color={theme.colors.primary} />
          </StyledSignUpIconHolder>
        </StyledInfoWrapper>
        <StyledTitle>{i18n.t(TranslationInfo.SignIn)}</StyledTitle>
        <FormLogin onSignInSubmitData={onSignInSubmitData} />
      </StyledScreenWrapper>
    </TouchableDismissWrappper>
  );
}
export default SignIn;
