import React, { Dispatch, SetStateAction } from 'react';

import styled from 'styled-components/native';
import { FormikErrors, FormikTouched } from 'formik';
import { useTheme } from 'styled-components';
import CustomInput from 'components/CustomInput/Index';
import PhoneInput from 'components/PhoneInput/Index';
import DateInput from 'components/DateInput/Index';
import Avatar from 'components/Avatar/Index';
import MapView from 'components/Map/Index';
import { OrientationProps } from 'components/Styled/Index';
import { useGetOrientation } from 'utils/Hooks/useGetOrientation';
import { IValuesData } from './FormContact';
import { ILocationProps } from 'typings/interfaces';
import { FieldsContact } from 'typings/enums';

const StyledInputGroupWrapper = styled.View`
  align-items: center;
`;

const StyledMapWrapper = styled.ScrollView<OrientationProps>`
  padding: ${(props) => (props.orientation === 'Landscape' ? '0 120px' : '0px')};
`;
interface IFieldsListProps extends ILocationProps {
  step: number;
  handleChange: any;
  handleBlur: any;
  values: IValuesData;
  errors: FormikErrors<IValuesData>;
  touched: FormikTouched<IValuesData>;
  isValidPhone: boolean;
  phoneNumber: string;
  isPhoneBlurredWithoutValue: boolean;
  isDateBlurredWithoutValue: boolean;
  birthDay: string;
  avatarLink: string;
  dateNumberHandler: (value: string) => void;
  onBlurDateHandler: () => void;
  setAvatarLink: Dispatch<SetStateAction<string>>;
  phoneNumberHandler: (value: string) => void;
  onBlurPhoneHandler: () => void;
}

export default function FieldsList(props: IFieldsListProps) {
  const { orientation } = useGetOrientation();

  const InputScrollStyles =
    orientation === 'Landscape' ? { paddingLeft: 100, paddingRight: 100 } : null;

  const theme = useTheme();

  const renderFields = ({
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    step,
    isValidPhone,
    phoneNumber,
    isPhoneBlurredWithoutValue,
    isDateBlurredWithoutValue,
    birthDay,
    avatarLink,
    location,
    setAvatarLink,
    dateNumberHandler,
    onBlurDateHandler,
    phoneNumberHandler,
    onBlurPhoneHandler,
    setLocation,
  }: IFieldsListProps) => {
    switch (step) {
      case 0:
        return (
          <StyledInputGroupWrapper style={InputScrollStyles}>
            <CustomInput
              fieldName={FieldsContact.firstName}
              value={values['First Name']}
              error={errors['First Name']}
              touched={touched['First Name']}
              handleChange={handleChange}
              handleBlur={handleBlur}
              maxLength={30}
            />
            <CustomInput
              fieldName={FieldsContact.lastName}
              value={values['Last Name']}
              error={errors['Last Name']}
              touched={touched['Last Name']}
              handleChange={handleChange}
              handleBlur={handleBlur}
              maxLength={30}
            />
            <CustomInput
              fieldName={FieldsContact.occupation}
              value={values['Occupation']}
              error={errors['Occupation']}
              handleChange={handleChange}
              handleBlur={handleBlur}
              maxLength={40}
            />
          </StyledInputGroupWrapper>
        );
      case 1:
        return (
          <StyledInputGroupWrapper style={InputScrollStyles}>
            <PhoneInput
              phoneNumberHandler={phoneNumberHandler}
              onBlurHandler={onBlurPhoneHandler}
              color={theme.colors.secondaryTextColor}
              isValidPhone={isValidPhone}
              phoneNumber={phoneNumber}
              placeholder={FieldsContact.phoneNumber}
              isPhoneBlurredWithoutValue={isPhoneBlurredWithoutValue}
            />
            <CustomInput
              fieldName={FieldsContact.email}
              value={values['Email']}
              error={errors['Email']}
              touched={touched['Email']}
              handleChange={handleChange}
              handleBlur={handleBlur}
              keyboard="email-address"
              maxLength={80}
            />
            <CustomInput
              fieldName={FieldsContact.website}
              value={values['Website']}
              error={errors['Website']}
              handleChange={handleChange}
              handleBlur={handleBlur}
              keyboard="url"
              isValidateWithoutTouched
            />
          </StyledInputGroupWrapper>
        );
      case 2:
        return (
          <StyledInputGroupWrapper style={InputScrollStyles}>
            <Avatar value={avatarLink} setValue={setAvatarLink} />
            <DateInput
              dateNumberHandler={dateNumberHandler}
              onBlurHandler={onBlurDateHandler}
              isFieldBlurredWithoutValue={isDateBlurredWithoutValue}
              dateValue={birthDay}
              placeholder={FieldsContact.dateOfBirth}
              color={theme.colors.secondaryTextColor}
            />
          </StyledInputGroupWrapper>
        );
      case 3:
        return (
          <StyledMapWrapper orientation={orientation}>
            <MapView location={location} setLocation={setLocation} />
          </StyledMapWrapper>
        );
      default:
        return null;
    }
  };
  return <>{renderFields(props)}</>;
}
