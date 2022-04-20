import React from 'react';

import styled, { useTheme } from 'styled-components/native';
import { Picker } from '@react-native-picker/picker';
import { IsIOS } from 'utils/helpers';
import { useLanguage } from 'utils/Hooks/useLanguage';
import { TranslationInfo } from 'typings/enums';

interface IPickedProp {
  value: string;
  setValue: any;
}

const StyledPickerTitle = styled.Text`
  color: ${(props) => props.theme.colors.mainTextColor};
  margin: 20px 0 5px;
  font-size: 20px;
  font-family: ${(props) => props.theme.fonts.secondaryMedium};
`;

const StyledPickerWrapper = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  border-width: 2px;
  border-color: ${(props) => props.theme.colors.secondaryTextColor};
  border-radius: 6px;
  overflow: hidden;
  height: 50px;
  width: 328px;
`;

export default function PickerLanguage({ value, setValue }: IPickedProp) {
  const Item: any = Picker.Item;

  const theme = useTheme();
  const i18n = useLanguage();

  const onValueChangeHandler = (val: string) => {
    setValue(val);
  };

  const getItemColor = (selected: string) => {
    if (selected === value) {
      return theme.colors.primary;
    } else {
      return theme.colors.mainTextColor;
    }
  };
  const getItemStyle = (selected: string) => {
    if (selected === value) {
      return { fontSize: 20, backgroundColor: theme.colors.mainBackgroundColor };
    } else {
      return { fontSize: 20, backgroundColor: theme.colors.secondaryBackgroundColor };
    }
  };

  return (
    <>
      <StyledPickerTitle>{i18n.t(TranslationInfo.SelectLanguage)}</StyledPickerTitle>
      <StyledPickerWrapper>
        <Picker
          selectedValue={value}
          onValueChange={onValueChangeHandler}
          dropdownIconColor={theme.colors.secondaryTextColor}
          style={{
            width: IsIOS ? 348 : 328,
            color: theme.colors.secondaryTextColor,
          }}
        >
          <Item label="Ru" value="ru" color={getItemColor('ru')} style={getItemStyle('ru')} />
          <Item label="En" value="en" color={getItemColor('en')} style={getItemStyle('en')} />
        </Picker>
      </StyledPickerWrapper>
    </>
  );
}
