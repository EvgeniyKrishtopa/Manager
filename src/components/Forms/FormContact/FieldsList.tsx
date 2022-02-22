import React, { Dispatch, SetStateAction } from 'react';

import { FormikErrors, FormikTouched } from 'formik';
import { useTheme } from 'styled-components';
import CustomInput from 'components/CustomInput/Index';
import PhoneInput from 'components/PhoneInput/Index';
import DateInput from 'components/DateInput/Index';
import Avatar from 'components/Avatar/Index';
import { FieldsContact } from 'typings/enums';
import { IValuesData } from './FormContact';

import { ILocationProps } from 'typings/interfaces';
import MapView from 'components/Map/Index';

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
  isCreate: boolean;
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
  const theme = useTheme();

  const renderFields = ({
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    step,
    isCreate,
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
          <>
            <CustomInput
              fieldName={FieldsContact.firstName}
              value={values['First Name']}
              error={errors['First Name']}
              touched={touched['First Name']}
              handleChange={handleChange}
              handleBlur={handleBlur}
              maxLength={80}
            />
            <CustomInput
              fieldName={FieldsContact.lastName}
              value={values['Last Name']}
              error={errors['Last Name']}
              touched={touched['Last Name']}
              handleChange={handleChange}
              handleBlur={handleBlur}
              maxLength={80}
            />
            <CustomInput
              fieldName={FieldsContact.occupation}
              value={values['Occupation']}
              error={errors['Occupation']}
              handleChange={handleChange}
              handleBlur={handleBlur}
              maxLength={80}
            />
          </>
        );
      case 1:
        return (
          <>
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
          </>
        );
      case 2:
        return (
          <>
            <Avatar value={avatarLink} setValue={setAvatarLink} />
            <DateInput
              dateNumberHandler={dateNumberHandler}
              onBlurHandler={onBlurDateHandler}
              isFieldBlurredWithoutValue={isDateBlurredWithoutValue}
              dateValue={birthDay}
              placeholder={FieldsContact.dateOfBirth}
              color={theme.colors.secondaryTextColor}
            />
          </>
        );
      case 3:
        return <MapView location={location} setLocation={setLocation} isCreate={isCreate} />;
      default:
        return null;
    }
  };
  return <>{renderFields(props)}</>;
}
