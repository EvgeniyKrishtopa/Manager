import React, { useState, useEffect } from 'react';

import { TouchableOpacity } from 'react-native';
import { RootState } from 'redux/store';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as Linking from 'expo-linking';
import ContactInfo from 'components/ContactInfo/Index';
import Map from 'components/Map/Map';
import { useNavigationHook } from 'utils/Hooks/useNavigationHook';
import { useDispatchHook } from 'utils/Hooks/useDispatchHook';
import { withBackgroundImage } from 'utils/Hocs/withBackgroundImage';
import {
  IArticleManageData,
  IAvatarConfig,
  ICreateContactData,
  ILocation,
} from 'typings/interfaces';
import { FullContactView, Screens, Errors } from 'typings/enums';
import TouchableDismissWrappper from 'utils/TouchableDismissWrappper';
import ErrorBoundary from 'utils/ErrorBoundary';
import { BottomTabStackParamList } from 'navigations/Index';

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

  const [navigation] = useNavigationHook(Screens.FullViewContact);

  const { avatars } = useSelector((state: RootState) => state.contacts);

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
      avatar && setAvatar(avatar?.link);
    }
  }, [route, avatars]);

  return (
    <ErrorBoundary message={Errors.Error}>
      <TouchableDismissWrappper>
        <StyledWrapper>
          {contact ? <ContactInfo avatar={avatar} isFromFullView={true} item={contact} /> : null}
          {birthayContact.length ? (
            <StyledBirthday>{`Birthday: ${birthayContact}`}</StyledBirthday>
          ) : null}
          {websiteContact.length ? (
            <StyledWebsiteWrapper>
              <StyledWebsiteText>Website: </StyledWebsiteText>
              <TouchableOpacity onPress={onPressWebSiteLink}>
                <StyledWebsiteLink>{websiteContact}</StyledWebsiteLink>
              </TouchableOpacity>
            </StyledWebsiteWrapper>
          ) : null}
          {locationContact ? <Map location={locationContact} mode="View" /> : null}
          <StyledOpenFullArticleWrapper onPress={onEditScreenOpen}>
            <StyledOpenFullArticleText>{FullContactView.EditContact}</StyledOpenFullArticleText>
          </StyledOpenFullArticleWrapper>
        </StyledWrapper>
      </TouchableDismissWrappper>
    </ErrorBoundary>
  );
}

export default withBackgroundImage(FullViewContact);
