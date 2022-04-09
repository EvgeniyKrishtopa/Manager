import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { getDimensions } from 'utils/helpers';
import { IContactInfo } from 'typings/interfaces';
import * as Linking from 'expo-linking';

type ElementProps = {
  isFromFullView: boolean;
  width?: number;
};

const StyledWrapper = styled.View`
  width: 100%;
`;

const StyledContactInfoWrapper = styled.View<ElementProps>`
  margin-bottom: ${(props) => (props.isFromFullView ? '10px' : '8px')};
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledAvatar = styled.Image<ElementProps>`
  width: ${(props) => (props.isFromFullView ? '120px' : '75px')};
  height: ${(props) => (props.isFromFullView ? '120px' : '75px')};
  margin-left: 6px;
  border-width: 2px;
  border-radius: ${(props) => (props.isFromFullView ? '120px' : '75px')};
  border-color: ${(props) => props.theme.colors.mainTextColor};
`;

const StyledHolder = styled.View<ElementProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  margin-left: ${(props) => (props.isFromFullView ? '20px' : '15px')};
`;

const StyledOccupation = styled.Text<ElementProps>`
  color: ${(props) => props.theme.colors.mainTextColor};
  font-family: ${(props) => props.theme.fonts.secondaryBold};
  font-size: ${(props) => (props.isFromFullView ? '20px' : '16px')};
  margin-bottom: ${(props) => (props.isFromFullView ? '10px' : '5px')};
  width: ${(props) => (props.isFromFullView ? `${props.width}px` : `${props.width}px`)};
  padding-right: 20px;
`;

const StyledEmail = styled.Text<ElementProps>`
  color: ${(props) => props.theme.colors.primary};
  font-family: ${(props) => props.theme.fonts.secondaryBold};
  font-size: ${(props) => (props.isFromFullView ? '18px' : '14px')};
  margin-bottom: ${(props) => (props.isFromFullView ? '8px' : '5px')};
`;

const StyledPhone = styled.Text<ElementProps>`
  color: ${(props) => props.theme.colors.primary};
  font-family: ${(props) => props.theme.fonts.secondaryBold};
  font-size: ${(props) => (props.isFromFullView ? '18px' : '14px')};
`;

export default function ContactInfo({ item, avatar, isFromFullView }: IContactInfo) {
  const [occupation, setOccupation] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [computedWidth, setComputedWidth] = useState<number>(0);

  const theme = useTheme();

  const { windowWidth } = getDimensions();

  const onPressEmailHandler = () => {
    Linking.openURL(`mailto:${email}`);
  };

  const onPressPhoneHandler = () => {
    Linking.openURL(`tel://${phoneNumber}`);
  };

  useEffect(() => {
    if (isFromFullView) {
      setComputedWidth(windowWidth - 150);
    } else {
      setComputedWidth(windowWidth - 130);
    }
  }, [windowWidth, isFromFullView]);

  useEffect(() => {
    if (item) {
      const { occupation, email, phoneNumber } = item;
      setOccupation(occupation);
      setEmail(email);
      setPhoneNumber(phoneNumber);
    }
  }, [item]);

  return (
    <StyledWrapper>
      <StyledContactInfoWrapper isFromFullView={isFromFullView}>
        {avatar?.length ? (
          <StyledAvatar
            isFromFullView={isFromFullView}
            source={{
              uri: avatar,
            }}
          />
        ) : (
          <Ionicons
            name="person-circle-outline"
            size={isFromFullView ? 160 : 90}
            color={theme.colors.primary}
          />
        )}
        <StyledHolder isFromFullView={isFromFullView}>
          {occupation.length ? (
            <StyledOccupation
              isFromFullView={isFromFullView}
              ellipsizeMode={'tail'}
              numberOfLines={2}
              width={computedWidth}
            >
              {occupation}
            </StyledOccupation>
          ) : null}
          {email.length ? (
            <TouchableOpacity onPress={onPressEmailHandler}>
              <StyledEmail isFromFullView={isFromFullView} ellipsizeMode={'tail'} numberOfLines={1}>
                {email}
              </StyledEmail>
            </TouchableOpacity>
          ) : null}
          {phoneNumber.length ? (
            <TouchableOpacity onPress={onPressPhoneHandler}>
              <StyledPhone isFromFullView={isFromFullView} ellipsizeMode={'tail'} numberOfLines={1}>
                {phoneNumber}
              </StyledPhone>
            </TouchableOpacity>
          ) : null}
        </StyledHolder>
      </StyledContactInfoWrapper>
    </StyledWrapper>
  );
}
