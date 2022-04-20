import { useSelector } from 'react-redux';
import i18n from 'i18n-js';
import { RootState } from 'redux/store';
import { translations } from '../../localization/index';

i18n.translations = translations;
i18n.fallbacks = true;

export const useLanguage = () => {
  const { language } = useSelector((state: RootState) => state.users);
  i18n.locale = language;

  return i18n;
};
