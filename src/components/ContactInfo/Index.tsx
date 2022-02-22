import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { IContactInfo } from 'typings/interfaces';
import * as Linking from 'expo-linking';

type ElementProps = {
  isFromFullView: boolean;
};

const StyledContactInfoWrapper = styled.View<ElementProps>`
  margin-bottom: ${(props) => (props.isFromFullView ? '10px' : '8px')};
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledAvatar = styled.Image<ElementProps>`
  width: ${(props) => (props.isFromFullView ? '140px' : '75px')};
  height: ${(props) => (props.isFromFullView ? '140px' : '75px')};
  margin-left: 6px;
  border-width: 2px;
  border-radius: ${(props) => (props.isFromFullView ? '140px' : '75px')};
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
  font-size: ${(props) => (props.isFromFullView ? '25px' : '16px')};
  margin-bottom: ${(props) => (props.isFromFullView ? '20px' : '5px')};
`;

const StyledEmail = styled.Text<ElementProps>`
  color: ${(props) => props.theme.colors.primary};
  font-family: ${(props) => props.theme.fonts.secondaryBold};
  font-size: ${(props) => (props.isFromFullView ? '18px' : '14px')}
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

  const theme = useTheme();

  const onPressEmailHandler = () => {
    Linking.openURL(`mailto:${email}`);
  };

  const onPressPhoneHandler = () => {
    Linking.openURL(`tel://${phoneNumber}`);
  };

  useEffect(() => {
    if (item) {
      const { occupation, email, phoneNumber } = item;
      setOccupation(occupation);
      setEmail(email);
      setPhoneNumber(phoneNumber);
    }
  }, [item]);

  return (
    <>
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
              numberOfLines={1}
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
    </>
  );
}
