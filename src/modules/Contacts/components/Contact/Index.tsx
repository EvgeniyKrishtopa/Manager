import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import ItemWrapper from 'components/ItemWrapper/Index';
import ContactInfo from 'components/ContactInfo/Index';
import { IItemProps, IAvatarConfig } from 'typings/interfaces';

const StyledNameWrapper = styled.View`
  font-size: 18px;
  padding: 15px 55px 15px 15px;
  margin-bottom: 15px;
  background-color: ${(props) => props.theme.colors.primary};
`;

const StyledName = styled.Text`
  color: ${(props) => props.theme.colors.secondaryTextColor};
  font-family: ${(props) => props.theme.fonts.primaryBold};
  font-size: 18px;
`;

export default function Contact({ item, userId, avatars, openFullScreen }: IItemProps) {
  const [avatar, setAvatar] = useState<string>('');
  const { created, id, firstName, lastName } = item.item;

  useEffect(() => {
    if (avatars?.length) {
      const avatar = avatars.find((item: IAvatarConfig) => item.id === id);
      avatar && setAvatar(avatar?.link);
    }
  }, [avatars, item]);

  return (
    <ItemWrapper
      id={id}
      userId={userId}
      openFullScreen={openFullScreen}
      isFrom="contact"
      created={created}
    >
      <>
        <StyledNameWrapper>
          <StyledName
            ellipsizeMode={'tail'}
            numberOfLines={1}
          >{`${firstName} ${lastName}`}</StyledName>
        </StyledNameWrapper>
        <ContactInfo item={item.item} avatar={avatar} isFromFullView={false} />
      </>
    </ItemWrapper>
  );
}
