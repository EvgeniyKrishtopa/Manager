import React from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

interface IProps {
  children: JSX.Element;
}

function TouchableDismissWrappper({ children }: IProps) {
  const onPressKeyboardDismsissHandler = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={onPressKeyboardDismsissHandler}>
      {children}
    </TouchableWithoutFeedback>
  );
}

export default TouchableDismissWrappper;
