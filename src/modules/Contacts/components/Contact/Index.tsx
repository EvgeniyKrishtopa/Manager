import React, { useState, useEffect, memo } from 'react';

import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import ItemWrapper from 'components/ItemWrapper/Index';
import ContactInfo from 'components/ContactInfo/Index';
import { DeleteContactAction, DeleteContactImageAction } from 'redux/reducers/contactsUserReducer';
import { IItemProps, IAvatarConfig } from 'typings/interfaces';
import { useDispatchHook } from 'utils/Hooks/useDispatchHook';
import { useNavigationHook } from 'utils/Hooks/useNavigationHook';
import { Screens } from 'typings/enums';
import { useListAnimate } from 'utils/Hooks/useListAnimate';

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

function Contact({ item, userId, avatars, index = 0 }: IItemProps) {
  const [avatar, setAvatar] = useState<string>('');
  const { created, id, firstName, lastName } = item;
  const [navigation] = useNavigationHook(Screens.Contacts);
  const [dispatch] = useDispatchHook();
  const style = useListAnimate(index);

  const openFullScreen = () => {
    const contact = item;
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
    <Animated.View style={[style]}>
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
    </Animated.View>
  );
}

export default memo(Contact);
