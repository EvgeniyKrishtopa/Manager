import { FormikErrors } from 'formik';
import { Dispatch, SetStateAction } from 'react';

export interface IUserState {
  userData: any | null;
  error: string;
  isLoginnedUser: boolean;
  imageURL: null | string;
  typeUserAction: string;
}
export interface IArticle {
  title: string;
}
export interface IAuthData {
  email: string;
  password: string;
}

export interface IUserUpdateDisplayName {
  userName: string;
}

export interface IUserUploadAvatar {
  id: string;
  userAvatar: string;
  avatarId?: string;
}
export interface IUserUpdationData extends IUserUpdateDisplayName {
  userAvatar: string;
}
export interface IWithNotificationProps {
  textNotification?: string;
  isNotificationSuccessVisible: boolean;
  isNotificationErrorVisible: boolean;
}
export interface IPropsForms {
  id: string;
  type?: string;
  article? : IArticleManageData | null,
  contact? : ICreateContactData | null,
  isCreate? : boolean,
  avatar?: string;
}
export interface IArticleData {
  title: string;
  description: string;
  info: string;
  date?: string;
  id?: string;
  userId? : string;
}

export interface IArticleManageData {
  created: number;
  description: string;
  id: string;
  info: string;
  title: string;
  userId?: string;
}
export interface IArticleState {
  articles: Array<IArticleManageData> | null;
  errorArticle: string;
  typeArticleAction: string;
  isLoading: boolean;
}

export interface IAvatarConfig {
  link: string;
  id: string;
}

export interface ICreateContactData {
  firstName: string;
  lastName: string;
  email: string;
  occupation: string;
  phoneNumber: string;
  birthDay: string;
  location: ILocation | null;
  id: string;
  webSite: string;
  docId?: string;
  userId?: string;
}
export interface IContactState {
  contacts: Array<ICreateContactData> | null;
  errorContact: string;
  avatars: Array<IAvatarConfig>;
  typeContactAction: string;
  isLoading: boolean;
}
export interface ICustomInputProp {
  fieldName: string;
  error: string | string[] | FormikErrors<any> | FormikErrors<any>[] | undefined;
  value: string;
  touched?: boolean;
  handleChange: any;
  handleBlur: any;
  heightInput?: number;
  maxLength?: number;
  multiline?: boolean;
  secureTextEntry?: boolean;
  isValidateWithoutTouched?: boolean;
  setDynamicHeight?: Dispatch<SetStateAction<number>>;
  keyboard?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'number-pad'
    | 'decimal-pad'
    | 'visible-password'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'name-phone-pad'
    | 'twitter'
    | 'web-search';
}
export interface IDateInputProp {
  dateNumberHandler: (value: string) => void;
  onBlurHandler: () => void;
  isFieldBlurredWithoutValue: boolean;
  dateValue: string;
  placeholder: string;
  color: string;
}
export interface IPhoneInputProp {
  phoneNumberHandler: (value: string) => void;
  onBlurHandler: () => void;
  isValidPhone: boolean;
  isPhoneBlurredWithoutValue: boolean;
  phoneNumber: string;
  placeholder: string;
  color: string;
}
export interface ILocation {
  latitude: number;
  longitude: number;
}
export interface ILocationProps {
  location: ILocation | null;
  setLocation?: Dispatch<SetStateAction<ILocation | null>>;
  mode?: string;
  isCreate?: boolean
}

export interface IItemProps {
  item: any;
  userId: string;
  openFullScreen: (id: string) => void;
  avatars?: Array<IAvatarConfig>;
}

export interface IContactInfo {
  item: ICreateContactData | null;
  avatar: string;
  isFromFullView: boolean;
}