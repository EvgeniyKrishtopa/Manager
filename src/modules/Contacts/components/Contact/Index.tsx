import React, { useState, useEffect, memo } from 'react';
import styled from 'styled-components/native';
import ItemWrapper from 'components/ItemWrapper/Index';
import ContactInfo from 'components/ContactInfo/Index';
import { DeleteContactAction, DeleteContactImageAction } from 'redux/reducers/contactsUserReducer';
import { IItemProps, IAvatarConfig } from 'typings/interfaces';
import { useDispatchHook } from 'utils/Hooks/useDispatchHook';
import { useNavigationHook } from 'utils/Hooks/useNavigationHook';
import { Screens } from 'typings/enums';

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

function Contact({ item, userId, avatars }: IItemProps) {
  const [avatar, setAvatar] = useState<string>('');
  const { created, id, firstName, lastName } = item.item;
  const [navigation] = useNavigationHook(Screens.Contacts);
  const [dispatch] = useDispatchHook();

  const openFullScreen = () => {
    const contact = item.item;
    const params = { contact };
    //@ts-ignore
    navigation.navigate(Screens.FullViewContact, params);
  };

  const deleteContact = () => {
    dispatch(DeleteContactImageAction({ id }));
    dispatch(DeleteContactAction({ id, userId }));
  };

  useEffect(() => {
    if (avatars?.length) {
      const avatar = avatars.find((item: IAvatarConfig) => item.id === id);
      avatar && avatar.link && setAvatar(avatar.link);
    }
  }, [avatars, item, id]);

  return (
    <ItemWrapper
      id={id}
      userId={userId}
      openFullScreen={openFullScreen}
      deleteContact={deleteContact}
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

export default memo(Contact);
