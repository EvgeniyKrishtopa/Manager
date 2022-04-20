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
import { useLanguage } from 'utils/Hooks/useLanguage';
import { IValuesData } from './FormContact';
import { ILocationProps } from 'typings/interfaces';
import { FieldsContact, TranslationInfo } from 'typings/enums';

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
  avatarLink: string;
  birthDayFormatted: string;
  setBirthDayFormatted: (value: string) => void;
  dateNumberHandler: (value: any) => void;
  onBlurDateHandler: () => void;
  setAvatarLink: Dispatch<SetStateAction<string>>;
  phoneNumberHandler: (value: string) => void;
  onBlurPhoneHandler: () => void;
}

export default function FieldsList(props: IFieldsListProps) {
  const { orientation } = useGetOrientation();
  const i18n = useLanguage();

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
    avatarLink,
    location,
    birthDayFormatted,
    setBirthDayFormatted,
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
              placeholder={i18n.t(TranslationInfo.FirstName)}
              value={values['First Name']}
              error={errors['First Name']}
              touched={touched['First Name']}
              handleChange={handleChange}
              handleBlur={handleBlur}
              maxLength={30}
            />
            <CustomInput
              fieldName={FieldsContact.lastName}
              placeholder={i18n.t(TranslationInfo.LastName)}
              value={values['Last Name']}
              error={errors['Last Name']}
              touched={touched['Last Name']}
              handleChange={handleChange}
              handleBlur={handleBlur}
              maxLength={30}
            />
            <CustomInput
              fieldName={FieldsContact.occupation}
              placeholder={i18n.t(TranslationInfo.Occupation)}
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
              placeholder={i18n.t(TranslationInfo.PhoneNumber)}
              isPhoneBlurredWithoutValue={isPhoneBlurredWithoutValue}
            />
            <CustomInput
              fieldName={FieldsContact.email}
              placeholder={i18n.t(TranslationInfo.Email)}
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
              placeholder={i18n.t(TranslationInfo.WebSite)}
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
              birthDayFormatted={birthDayFormatted}
              setBirthDayFormatted={setBirthDayFormatted}
              isFieldBlurredWithoutValue={isDateBlurredWithoutValue}
              placeholder={i18n.t(TranslationInfo.Birthday)}
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
