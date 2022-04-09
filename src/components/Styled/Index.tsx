import styled from 'styled-components/native';

type InputProps = {
  heightInput?: number;
};

export type OrientationProps = {
  orientation: string;
};

export const StyledScreenWrapper = styled.View<OrientationProps>`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => (props.orientation === 'Portrait' ? 'center' : 'space-between')};
  padding: ${(props) => (props.orientation === 'Portrait' ? '10px 0' : '20px 0 60px')};
  align-items: center;
  background-color: ${(props) => props.theme.colors.secondaryBackgroundColor};
`;

export const StyledTitle = styled.Text`
  font-size: 16px;
  text-transform: uppercase;
  margin-bottom: 10px;
  padding-top: 10px;
  text-align: center;
  font-family: ${(props) => props.theme.fonts.primaryBold};
  color: ${(props) => props.theme.colors.secondaryTextColor};
`;

export const StyledInput = styled.TextInput<InputProps>`
  border-bottom-width: 2px;
  border-style: solid;
  border-color: ${(props) => props.theme.colors.secondaryTextColor};
  padding: 5px 0;
  color: ${(props) => props.theme.colors.secondaryTextColor};
  font-size: 16px;
  font-family: ${(props) => props.theme.fonts.primaryMedium};
  margin-bottom: 20px;
  width: 328px;
  height: ${(props) => (props.heightInput ? props.heightInput : 40)}px;
`;

export const TextError = styled.Text`
  font-size: 14px;
  font-family: ${(props) => props.theme.fonts.primaryMedium};
  color: ${(props) => props.theme.colors.error};
  padding: 5px 0 20px;
  margin-top: -15px;
`;

export const StyledButtonPrimary = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 20px;
  padding: 12px 45px;
  margin: 0 auto;
`;

export const StyledButtonPrimaryDisabled = styled(StyledButtonPrimary)`
  opacity: 0.6;
`;

export const StyledButtonTextPrimary = styled.Text`
  color: ${(props) => props.theme.colors.secondaryTextColor};
  font-size: 16px;
  font-family: ${(props) => props.theme.fonts.secondaryBold};
  font-weight: bold;
  text-transform: uppercase;
`;

export const StyledCard = styled.View`
  width: 90%;
  max-width: 620px;
  margin: 0 auto 10px;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  background-color: ${(props) => props.theme.colors.mainBackgroundColor};
  min-height: 130px;
`;

export const StyledIconDeleteWrapper = styled.TouchableOpacity`
  position: absolute;
  top: 15px;
  right: 15px;
`;

export const StyledDatePost = styled.Text`
  font-size: 14px;
  margin-bottom: 15px;
  padding-left: 15px;
  font-family: ${(props) => props.theme.fonts.secondaryBold};
  color: ${(props) => props.theme.colors.mainTextColor};
`;

export const StyledOpenFullCardWrapper = styled.TouchableOpacity`
  padding: 5px 12px;
  border-radius: 4px;
  background: transparent;
  border-color: ${(props) => props.theme.colors.primary};
  border-width: 1px;
  border-style: solid;
  position: absolute;
  bottom: 10px;
  right: 15px;
`;

export const StyledOpenFullCardText = styled.Text`
  text-align: center;
  font-size: 14px;
  color: ${(props) => props.theme.colors.mainTextColor};
  font-family: ${(props) => props.theme.fonts.secondaryBold};
`;

export const StyledItemsWrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  position: relative;
`;

export const StyledNoItemsYet = styled.Text`
  font-size: 20px;
  text-align: center;
  color: ${(props) => props.theme.colors.primary};
  font-family: ${(props) => props.theme.fonts.secondaryBold};
`;
