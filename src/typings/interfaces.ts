import { FormikErrors } from 'formik';
import { Dispatch, SetStateAction } from 'react';
import { Moment } from 'moment';
import { ArticleEditType } from 'modules/FullViewContact/Index';
export interface IUserState {
  userData: any | null;
  error: string;
  isLoginnedUser: boolean;
  imageURL: undefined | string;
  typeUserAction: string;
  orientation: string;
  language: string;
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
  isOnlyImageUpdated?: boolean;
}
export interface IUserUpdationData {
  saveDataHandler: () => void;
  isNameChanged: boolean;
  isLanguageChanged: boolean;
  isAvatarChanged: boolean;
}
export interface IContactDataCreate {
  dataCreate: ICreateContactData;
  avatarLink: string;
}
export interface IContactDataEdit {
  dataEdit: ICreateContactData;
  avatarLink: string;
}
export interface IPropsForms {
  id: string;
  type?: string;
  article?: IArticleManageData | null;
  contact?: ICreateContactData | null;
  isCreate?: boolean;
  avatar?: string;
  formArticleCreateSubmit?: (dataCreate: IArticleData) => void;
  formArticleEditSubmit?: (dataEdit: ArticleEditType) => void;
  formContactCreateSubmit?: (dataCreate: IContactDataCreate) => void;
  formContactEditSubmit?: (dataEdit: any) => void;
}
export interface IArticleData {
  title: string;
  description: string;
  info: string;
  date?: string;
  id?: string;
  userId?: string;
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
  isLoadingArticle: boolean;
}

export interface IAvatarConfig {
  link: string | undefined;
  id: string;
}
export interface IDeleteArticleData {
  id: string;
  userId: string;
}
export interface ICreateContactData {
  firstName: string;
  lastName: string;
  email: string;
  occupation: string;
  phoneNumber: string;
  birthDay: string | Moment;
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
  isLoadingContact: boolean;
}
export interface ICustomInputProp {
  fieldName: string;
  error: string | string[] | FormikErrors<any> | FormikErrors<any>[] | undefined;
  value: string;
  placeholder: string;
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
  dateNumberHandler: (value: any) => void;
  setBirthDayFormatted: (value: string) => void;
  onBlurHandler: () => void;
  birthDayFormatted: string;
  isFieldBlurredWithoutValue: boolean;
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
  isCreate?: boolean;
  orientation?: string;
}
export interface IItemProps {
  item: any;
  userId: string;
  index?: number;
  openFullScreen?: () => void;
  avatars?: Array<IAvatarConfig>;
}
export interface IContactInfo {
  item: ICreateContactData | null;
  avatar: string;
  isFromFullView: boolean;
}
