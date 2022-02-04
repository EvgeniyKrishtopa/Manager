import styled from 'styled-components/native';

type InputProps = {
  heightInput?: number;
};

export const StyledScreenWrapper = styled.View`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.secondaryBackgroundColor};
`;

export const StyledTitle = styled.Text`
  font-size: 18px;
  text-transform: uppercase;
  margin-bottom: 30px;
  padding-top: 30px;
  text-align: center;
  font-family: ${(props) => props.theme.fonts.primaryBold}
  color: ${(props) => props.theme.colors.secondaryTextColor};
`;

export const StyledInput = styled.TextInput<InputProps>`
  border-bottom-width: 2px;
  border-style: solid;
  border-color: ${(props) => props.theme.colors.secondaryTextColor};
  padding: 10px 0;
  color: ${(props) => props.theme.colors.secondaryTextColor};
  font-size: 16px;
  font-family: ${(props) => props.theme.fonts.primaryMedium};
  margin-bottom: 15px;
  width: 300px;
  height: ${(props) => (props.heightInput ? props.heightInput : 50)}px;
`;

export const TextError = styled.Text`
  font-size: 16px;
  font-family: ${(props) => props.theme.fonts.primaryMedium}
  color: ${(props) => props.theme.colors.error};
  padding: 5px 0 20px;
  margin-top: -15px;
`;

export const StyledButtonPrimary = styled.TouchableOpacity`
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 20px;
  padding: 12px 45px;
`;

export const StyledButtonTextPrimary = styled.Text`
  color: ${(props) => props.theme.colors.secondaryTextColor};
  font-size: 16px;
  font-family: ${(props) => props.theme.fonts.secondaryBold};
  font-weight: bold;
  text-transform: uppercase;
`;
