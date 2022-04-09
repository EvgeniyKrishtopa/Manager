import React from 'react';

import styled from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

const StyledButtonWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
`;

const ButtonStepWrapper = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  margin: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  background-color: ${(props) => props.theme.colors.primary};
`;

interface IButtonStepperProps {
  step: number;
  setStep: any;
  stepsAmount: number;
}

export default function ButtonStepper({ step, setStep, stepsAmount }: IButtonStepperProps) {
  const theme = useTheme();

  const goBackStepHandler = () => {
    setStep(step - 1);
  };

  const goForwardStepHandler = () => {
    setStep(step + 1);
  };

  return (
    <StyledButtonWrapper>
      {step > 0 && (
        <ButtonStepWrapper onPress={goBackStepHandler}>
          <AntDesign name="arrowleft" size={20} color={theme.colors.secondaryTextColor} />
        </ButtonStepWrapper>
      )}
      {step >= 0 && step !== stepsAmount - 1 && (
        <ButtonStepWrapper onPress={goForwardStepHandler}>
          <AntDesign name="arrowright" size={20} color={theme.colors.secondaryTextColor} />
        </ButtonStepWrapper>
      )}
    </StyledButtonWrapper>
  );
}
