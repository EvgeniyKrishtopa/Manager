import React, { useState } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import styled from 'styled-components/native';
import { useTheme } from 'styled-components';
import { Moment } from 'moment';
import moment from 'moment';
import CalendarPicker from 'react-native-calendar-picker';
import { StyledInput, TextError } from 'components/Styled/Index';
import CustomModal from 'components/CustomModal/Index';
import { getFormattedDate } from 'utils/helpers';
import { useLanguage } from 'utils/Hooks/useLanguage';
import { IDateInputProp } from 'typings/interfaces';
import { FieldsContact, TranslationInfo } from 'typings/enums';

const StyledInputWrapper = styled.View`
  position: relative;
`;

const StyledButtonOpenModal = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  top: 0;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) => props.theme.colors.secondaryTextColor};
  border-radius: 12px;
  padding: 5px;
`;

const StyledButtonText = styled.Text`
  color: ${(props) => props.theme.colors.secondaryTextColor};
  font-size: 12px;
  text-transform: uppercase;
`;

export default function DateInput({
  dateNumberHandler,
  onBlurHandler,
  birthDayFormatted,
  setBirthDayFormatted,
  isFieldBlurredWithoutValue,
  placeholder,
  color,
}: IDateInputProp) {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selected, setSelected] = useState<Date | Moment>(new Date());

  const { language } = useSelector((state: RootState) => state.users);

  const theme = useTheme();
  const i18n = useLanguage();

  const openModalHandler = () => {
    setIsModalVisible(true);
  };

  const onDateChange = (value: Moment) => {
    setSelected(value);
    const formattedValue = getFormattedDate(value, language);
    setBirthDayFormatted(formattedValue);
    dateNumberHandler(moment(value).format());
    setIsModalVisible(false);
  };

  return (
    <StyledInputWrapper>
      <StyledInput
        onChangeText={dateNumberHandler}
        value={birthDayFormatted}
        onBlur={onBlurHandler}
        placeholder={placeholder}
        placeholderTextColor={color}
        showSoftInputOnFocus={false}
        editable={false}
      />
      <StyledButtonOpenModal onPress={openModalHandler}>
        <StyledButtonText>{i18n.t(TranslationInfo.PickDate)}</StyledButtonText>
      </StyledButtonOpenModal>
      {isFieldBlurredWithoutValue ? <TextError>{FieldsContact.required}</TextError> : null}
      <CustomModal isVisible={isModalVisible} setIsModalVisible={setIsModalVisible}>
        <CalendarPicker
          //@ts-ignore
          selectedStartDate={selected}
          onDateChange={onDateChange}
          todayBackgroundColor={theme.colors.secondaryBackgroundColor}
          selectedDayColor={theme.colors.mainTextColor}
          selectedDayTextColor={theme.colors.primary}
          textStyle={{ color: theme.colors.secondaryTextColor }}
          disabledDatesTextStyle={{ color: theme.colors.disabled }}
          disabledDates={(date) => {
            return date > moment(new Date());
          }}
          startFromMonday
        />
      </CustomModal>
    </StyledInputWrapper>
  );
}
