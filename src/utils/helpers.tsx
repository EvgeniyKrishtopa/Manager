import { Platform, Dimensions } from 'react-native';
import { PhoneNumberUtil } from 'google-libphonenumber';
import moment, { Moment } from 'moment';

export const IsIOS = Platform.OS === 'android' ? false : true;

export const getPictureBlob = (uri: string) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });
};

export const getFormattedDate = (date: Moment | string, language: string) => {
  if (language === 'ru') {
    //@ts-ignore
    import('moment/locale/ru').then(() => {
      moment.locale('ru');
    });
  }
  if (language === 'en') {
    //@ts-ignore
    import('moment/locale/en-au').then(() => {
      moment.locale('en');
    });
  }

  return moment(date).format('MMMM Do YYYY');
};

const phoneUtil = PhoneNumberUtil.getInstance();

export const phoneValidate = (value: string) => {
  try {
    const number = phoneUtil.parseAndKeepRawInput(value);
    const regionCode = phoneUtil.getRegionCodeForNumber(number);
    const numberWithCode = phoneUtil.parseAndKeepRawInput(value, regionCode);
    const isPossible = phoneUtil.isPossibleNumber(numberWithCode);
    const isValid = phoneUtil.isValidNumber(numberWithCode);
    const formattedNumber = phoneUtil.formatInOriginalFormat(numberWithCode, regionCode);
    const dataValidation = { isPossible, isValid, formattedNumber };
    return dataValidation;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const uidCleaner = (uid: string) => {
  return uid.replace(/-/g, '');
};

export const getDimensions = () => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return {
    windowWidth,
    windowHeight,
  };
};
