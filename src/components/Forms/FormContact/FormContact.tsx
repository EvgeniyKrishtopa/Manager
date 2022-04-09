import React, { useState, useEffect } from 'react';

import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import uuid from 'react-native-uuid';
import InputScrollView from 'react-native-input-scroll-view';
import CustomButton from 'components/CustomButton/Index';
import { phoneValidate } from 'utils/helpers';
import { IPropsForms, ILocation, ICreateContactData } from 'typings/interfaces';
import ButtonStepper from './ButtonStepper';
import FieldsList from './FieldsList';
import { FieldsContact } from 'typings/enums';

export interface IValuesData {
  [FieldsContact.firstName]: string;
  [FieldsContact.lastName]: string;
  [FieldsContact.email]: string;
  [FieldsContact.occupation]: string;
  [FieldsContact.website]: string;
}

export default function FormContact({
  id,
  contact = null,
  avatar = '',
  formContactCreateSubmit,
  formContactEditSubmit,
}: IPropsForms) {
  const [contactFirstName, setContactFirstName] = useState<string>('');
  const [contactLastName, setContactLastName] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [contactOccupation, setContactOccupation] = useState<string>('');
  const [contactWebsite, setContactWebsite] = useState<string>('');

  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValidPhone, setIsValidPhone] = useState(false);
  const [isPhoneBlurredWithoutValue, setIsPhoneBlurredWithoutValue] = useState(false);
  const [birthDay, setBirthDay] = useState<string>('');
  const [isDateBlurredWithoutValue, setIsDateBlurredWithoutValue] = useState(false);
  const [avatarLink, setAvatarLink] = useState<string>('');
  const [location, setLocation] = useState<null | ILocation>(null);
  const [step, setStep] = useState<number>(0);

  const [isValuesChanged, setIsValuesChanged] = useState<boolean>(false);

  const STEPS = 4;

  const values: IValuesData = {
    [FieldsContact.firstName]: contactFirstName,
    [FieldsContact.lastName]: contactLastName,
    [FieldsContact.email]: contactEmail,
    [FieldsContact.occupation]: contactOccupation,
    [FieldsContact.website]: contactWebsite,
  };

  const formSubmit = (values: IValuesData) => {
    const data: ICreateContactData = {
      firstName: values[FieldsContact.firstName],
      lastName: values[FieldsContact.lastName],
      email: values[FieldsContact.email],
      occupation: values[FieldsContact.occupation],
      webSite: values[FieldsContact.website],
      phoneNumber,
      birthDay,
      location,
      id,
    };

    if (contact) {
      const dataEdit = { ...data, ...{ id: contact.id, userId: id } };
      formContactEditSubmit && formContactEditSubmit({ dataEdit, avatarLink });
    } else {
      const generatedDocId = uuid.v4().toString();
      const dataCreate = { ...data, docId: generatedDocId };
      formContactCreateSubmit && formContactCreateSubmit({ dataCreate, avatarLink });
    }
  };

  const phoneNumberHandler = (value: string) => {
    const isStartsWithPlus = value.startsWith('+');

    if (value.length > 0) {
      setIsPhoneBlurredWithoutValue(false);
    }

    if (value.length > 6) {
      const dataValidation = phoneValidate(value);

      if (dataValidation) {
        const { isPossible, isValid, formattedNumber } = dataValidation;

        setIsValidPhone(isPossible && isValid);

        formattedNumber && setPhoneNumber(formattedNumber);
      } else {
        setIsValidPhone(false);
        setPhoneNumber(value);
      }

      return;
    }

    if (!isStartsWithPlus && value.length > 0) {
      setPhoneNumber(`+${value}`);
    } else {
      setPhoneNumber(value);
    }
  };

  const onBlurPhoneHandler = () => {
    if (!phoneNumber.length) {
      setIsPhoneBlurredWithoutValue(true);
    } else {
      setIsPhoneBlurredWithoutValue(false);
    }
  };

  const onBlurDateHandler = () => {
    if (!birthDay.length) {
      setIsDateBlurredWithoutValue(true);
    } else {
      setIsDateBlurredWithoutValue(false);
    }
  };

  const dateNumberHandler = (value: string) => {
    setBirthDay(value);
  };

  const CreateContactSchema = Yup.object().shape({
    [FieldsContact.firstName]: Yup.string().required(FieldsContact.required),
    [FieldsContact.lastName]: Yup.string().required(FieldsContact.required),
    [FieldsContact.email]: Yup.string()
      .email(FieldsContact.invalidEmail)
      .required(FieldsContact.required),
    [FieldsContact.website]: Yup.string()
      .trim()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        FieldsContact.invalidSite,
      ),
  });

  useEffect(() => {
    if (contact) {
      setContactFirstName(contact.firstName);
      setContactLastName(contact.lastName);
      setContactEmail(contact.email);
      setContactOccupation(contact.occupation);
      setContactWebsite(contact.webSite);
      setPhoneNumber(contact.phoneNumber);
      setBirthDay(contact.birthDay);
      setLocation(contact.location);
      setIsValidPhone(true);
    }

    avatar.length && setAvatarLink(avatar);
  }, [contact, avatar]);

  useEffect(() => {
    if (contact) {
      if (contact.occupation !== contactOccupation) {
        setIsValuesChanged(true);
      } else if (contact.phoneNumber !== phoneNumber) {
        setIsValuesChanged(true);
      } else if (contact.birthDay !== birthDay) {
        setIsValuesChanged(true);
      } else if (contact.location !== location) {
        setIsValuesChanged(true);
      } else {
        setIsValuesChanged(false);
      }
    }
  }, [contact, contactOccupation, phoneNumber, birthDay, location]);

  useEffect(() => {
    if (avatar !== avatarLink) {
      setIsValuesChanged(true);
    }
  }, [avatar, avatarLink]);

  return (
    <Formik
      enableReinitialize
      initialValues={values}
      validationSchema={CreateContactSchema}
      onSubmit={(values, { resetForm }) => {
        formSubmit(values);
        resetForm();
      }}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        isValid,
        dirty,
      }: FormikProps<IValuesData>) => (
        <InputScrollView keyboardOffset={200}>
          <FieldsList
            step={step}
            handleChange={handleChange}
            handleBlur={handleBlur}
            values={values}
            errors={errors}
            touched={touched}
            phoneNumberHandler={phoneNumberHandler}
            onBlurPhoneHandler={onBlurPhoneHandler}
            isValidPhone={isValidPhone}
            phoneNumber={phoneNumber}
            isPhoneBlurredWithoutValue={isPhoneBlurredWithoutValue}
            dateNumberHandler={dateNumberHandler}
            onBlurDateHandler={onBlurDateHandler}
            isDateBlurredWithoutValue={isDateBlurredWithoutValue}
            birthDay={birthDay}
            avatarLink={avatarLink}
            setAvatarLink={setAvatarLink}
            location={location}
            setLocation={setLocation}
          />
          {step === STEPS - 1 && (
            <CustomButton
              handleSubmit={handleSubmit}
              isDisabled={!(isValid && dirty && isValidPhone && birthDay) && !isValuesChanged}
            />
          )}
          <ButtonStepper step={step} setStep={setStep} stepsAmount={STEPS} />
        </InputScrollView>
      )}
    </Formik>
  );
}
