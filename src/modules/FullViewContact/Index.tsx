import React, { useState, useEffect } from 'react';

import { TouchableOpacity, View, ScrollView } from 'react-native';
import { RootState } from 'redux/store';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabStackParamList } from 'navigations/Index';
import * as Linking from 'expo-linking';
import ContactInfo from 'components/ContactInfo/Index';
import { OrientationProps } from 'components/Styled/Index';
import Map from 'components/Map/Map';
import { useNavigationHook } from 'utils/Hooks/useNavigationHook';
import { useGetOrientation } from 'utils/Hooks/useGetOrientation';
import { useLanguage } from 'utils/Hooks/useLanguage';
import { withBackgroundImage } from 'utils/Hocs/withBackgroundImage';
import TouchableDismissWrappper from 'utils/TouchableDismissWrappper';
import ErrorBoundary from 'utils/ErrorBoundary';
import { getFormattedDate } from 'utils/helpers';
import {
  IArticleManageData,
  IAvatarConfig,
  ICreateContactData,
  ILocation,
} from 'typings/interfaces';
import { Screens, TranslationInfo } from 'typings/enums';

const StyledWrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
  padding-top: 30px;
`;

const StyledInfoWrapper = styled.View`
  align-items: flex-start;
`;

const StyledBirthdaySiteContainer = styled.View<OrientationProps>`
  padding-left: 30px;
  position: ${(props) => (props.orientation === 'Landscape' ? 'absolute' : 'relative')};
  left: ${(props) => (props.orientation === 'Landscape' ? '45%' : '0px')};
  top: ${(props) => (props.orientation === 'Landscape' ? '48px' : '0px')};
`;

const StyledOpenFullArticleWrapper = styled.TouchableOpacity`
  width: 180px;
  padding: 5px 12px;
  border-radius: 4px;
  background: ${(props) => props.theme.colors.primary};
  border-color: ${(props) => props.theme.colors.primary};
  border-width: 1px;
  border-style: solid;
  margin: 0 auto 20px;
`;

const StyledOpenFullArticleText = styled.Text`
  text-align: center;
  font-size: 16px;
  color: ${(props) => props.theme.colors.secondaryTextColor};
  font-family: ${(props) => props.theme.fonts.secondaryBold};
`;

const StyledWebsiteWrapper = styled.View`
  flex-direction: row;
  margin-bottom: 15px;
`;

const StyledWebsiteText = styled.Text`
  color: ${(props) => props.theme.colors.secondaryTextColor};
  font-family: ${(props) => props.theme.fonts.secondaryBold};
  font-size: 18px;
  margin-bottom: 10px;
`;

const StyledWebsiteLink = styled(StyledWebsiteText)`
  text-decoration: underline;
  color: ${(props) => props.theme.colors.mainTextColor};
`;

const StyledBirthday = styled.Text`
  font-family: ${(props) => props.theme.fonts.secondaryBold};
  color: ${(props) => props.theme.colors.secondaryTextColor};
  font-size: 18px;
  margin-bottom: 15px;
`;

type RouteProps = RouteProp<BottomTabStackParamList, Screens.FullViewArticle>;
type NavProps = StackNavigationProp<BottomTabStackParamList, Screens.FullViewArticle>;
export type ArticleEditType = Pick<
  IArticleManageData,
  'id' | 'title' | 'description' | 'info' | 'userId'
>;
interface INavProp {
  navigation: NavProps;
  route: RouteProps;
}

function FullViewContact({ route }: INavProp) {
  const [contact, setContact] = useState<ICreateContactData | null>(null);
  const [avatar, setAvatar] = useState<string>('');
  const [birthayContact, setBirtdayContact] = useState<string>('');
  const [websiteContact, setWebsiteContact] = useState<string>('');
  const [locationContact, setLocationContact] = useState<ILocation | null>(null);

  const { avatars } = useSelector((state: RootState) => state.contacts);
  const { language } = useSelector((state: RootState) => state.users);

  const [navigation] = useNavigationHook(Screens.FullViewContact);
  const { orientation } = useGetOrientation();
  const i18n = useLanguage();

  const onEditScreenOpen = () => {
    if (contact) {
      const params = { contact, avatar };
      //@ts-ignore
      navigation.navigate(Screens.EditContact, params);
    }
  };

  const onPressWebSiteLink = () => {
    Linking.openURL(websiteContact);
  };

  useEffect(() => {
    //@ts-ignore
    const { contact } = route.params;

    setContact(contact);

    setBirtdayContact(contact.birthDay);
    setWebsiteContact(contact.webSite);
    setLocationContact(contact.location);

    if (avatars?.length) {
      const avatar = avatars.find((item: IAvatarConfig) => item.id === contact.id);
      if (avatar) {
        avatar.link && setAvatar(avatar.link);
      }
    }
  }, [route, avatars]);

  return (
    <ErrorBoundary message={i18n.t(TranslationInfo.Error)}>
      <TouchableDismissWrappper>
        <ScrollView>
          <StyledWrapper>
            <StyledInfoWrapper>
              {contact ? (
                <ContactInfo avatar={avatar} isFromFullView={true} item={contact} />
              ) : null}
              <StyledBirthdaySiteContainer orientation={orientation}>
                {birthayContact.length ? (
                  <StyledBirthday>{`${i18n.t(TranslationInfo.Birthday)}: ${getFormattedDate(
                    birthayContact,
                    language,
                  )}`}</StyledBirthday>
                ) : null}
                {websiteContact.length ? (
                  <StyledWebsiteWrapper>
                    <StyledWebsiteText>{i18n.t(TranslationInfo.WebSite)}</StyledWebsiteText>
                    <TouchableOpacity onPress={onPressWebSiteLink}>
                      <StyledWebsiteLink>{websiteContact}</StyledWebsiteLink>
                    </TouchableOpacity>
                  </StyledWebsiteWrapper>
                ) : null}
              </StyledBirthdaySiteContainer>
            </StyledInfoWrapper>
            {locationContact ? (
              <View pointerEvents="none">
                <Map location={locationContact} mode="View" />
              </View>
            ) : null}
            <StyledOpenFullArticleWrapper onPress={onEditScreenOpen}>
              <StyledOpenFullArticleText>{i18n.t(TranslationInfo.Edit)}</StyledOpenFullArticleText>
            </StyledOpenFullArticleWrapper>
          </StyledWrapper>
        </ScrollView>
      </TouchableDismissWrappper>
    </ErrorBoundary>
  );
}

export default withBackgroundImage(FullViewContact);
