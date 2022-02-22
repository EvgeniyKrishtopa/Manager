import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import {
  AddNewContactAction,
  UploadContactImageAction,
  EditContactAction,
  clearLoading,
} from 'redux/reducers/contactsUserReducer';
import { Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import uuid from 'react-native-uuid';
import InputScrollView from 'react-native-input-scroll-view';
import { useDispatchHook } from 'utils/Hooks/useDispatchHook';
import { useNavigationHook } from 'utils/Hooks/useNavigationHook';
import CustomButton from 'components/CustomButton/Index';
import { phoneValidate } from 'utils/helpers';
import { IPropsForms, ILocation, ICreateContactData } from 'typings/interfaces';
import ButtonStepper from './ButtonStepper';
import FieldsList from './FieldsList';
import { FieldsContact, Screens } from 'typings/enums';
import { uidCleaner } from 'utils/helpers';

export interface IValuesData {
  [FieldsContact.firstName]: string;
  [FieldsContact.lastName]: string;
  [FieldsContact.email]: string;
  [FieldsContact.occupation]: string;
  [FieldsContact.website]: string;
}

export default function FormContact({
  id,
  isCreate = true,
  contact = null,
  avatar = '',
}: IPropsForms) {
  const [contactFirstName, setContactFirstName] = useState<string>('');
  const [contactLastName, setContactLastName] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [contactOccupation, setContactOccupation] = useState<string>('');
  const [contactWebsite, setContactWebsite] = useState<string>('');
  const [contactEditedId, setContactEditedId] = useState<string>('');

  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValidPhone, setIsValidPhone] = useState(false);
  const [isPhoneBlurredWithoutValue, setIsPhoneBlurredWithoutValue] = useState(false);
  const [birthDay, setBirthDay] = useState<string>('');
  const [isDateBlurredWithoutValue, setIsDateBlurredWithoutValue] = useState(false);
  const [avatarLink, setAvatarLink] = useState<string>('');
  const [location, setLocation] = useState<null | ILocation>(null);
  const [step, setStep] = useState<number>(0);
  const [dispatch] = useDispatchHook();

  const { contacts, isLoading } = useSelector((state: RootState) => state.contacts);

  const [navigation] = useNavigationHook(Screens.EditContact);

  const STEPS = 4;

  const values: IValuesData = {
    [FieldsContact.firstName]: contactFirstName,
    [FieldsContact.lastName]: contactLastName,
    [FieldsContact.email]: contactEmail,
    [FieldsContact.occupation]: contactOccupation,
    [FieldsContact.website]: contactWebsite,
  };

  const formSubmit = (values: IValuesData) => {
    const generatedDocId = uuid.v4().toString();

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

      const avatarEditId = uidCleaner(contact.id);
      dispatch(EditContactAction(dataEdit));
      avatarLink.length &&
        dispatch(
          UploadContactImageAction({
            id: contact.id,
            userAvatar: avatarLink,
            avatarId: avatarEditId,
          }),
        );
    } else {
      const dataCreate = { ...data, docId: generatedDocId };
      const avatarCreateId = uidCleaner(generatedDocId);
      dispatch(AddNewContactAction(dataCreate));
      avatarLink.length &&
        dispatch(
          UploadContactImageAction({
            id: generatedDocId,
            userAvatar: avatarLink,
            avatarId: avatarCreateId,
          }),
        );
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
    return () => {
      setStep(0);
    };
  }, []);

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
      setContactEditedId(contact.id);
      setIsValidPhone(true);
    }

    avatar.length && setAvatarLink(avatar);
  }, [contact, avatar]);

  useEffect(() => {
    if (!isLoading) {
      dispatch(clearLoading());

      let contact;

      if (!isCreate) {
        contact = contacts?.find((item: ICreateContactData) => item.id === contactEditedId);
      }

      if (contact) {
        const params = { contact };
        //@ts-ignore
        navigation.navigate(Screens.FullViewContact, params);
      } else {
        navigation.navigate(Screens.Contacts);
      }
    }
  }, [isLoading, contact]);

  return (
    <Formik
      enableReinitialize
      initialValues={values}
      validationSchema={CreateContactSchema}
      onSubmit={(values, { resetForm }) => {
        formSubmit(values);
        resetForm();

        setBirthDay('');
        setAvatarLink('');
        setLocation(null);
        setStep(0);
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
        <InputScrollView>
          <FieldsList
            isCreate={isCreate}
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
              isDisabled={!(isValid && dirty && isValidPhone && birthDay)}
            />
          )}
          <ButtonStepper step={step} setStep={setStep} stepsAmount={STEPS} />
        </InputScrollView>
      )}
    </Formik>
  );
}
