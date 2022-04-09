import React, { useState, useEffect } from 'react';

import styled from 'styled-components/native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabStackParamList } from 'navigations/Index';
import { RootState } from 'redux/store';
import { useSelector } from 'react-redux';
import {
  clearLoadingContact,
  EditContactAction,
  UploadContactImageAction,
} from 'redux/reducers/contactsUserReducer';
import Loader from 'components/Loader/Index';
import FormContact from 'components/Forms/FormContact/FormContact';
import TouchableDismissWrappper from 'utils/TouchableDismissWrappper';
import ErrorBoundary from 'utils/ErrorBoundary';
import { useNavigationHook } from 'utils/Hooks/useNavigationHook';
import { useDispatchHook } from 'utils/Hooks/useDispatchHook';
import { uidCleaner } from 'utils/helpers';
import { IContactDataEdit, ICreateContactData } from 'typings/interfaces';
import { Screens, Errors } from 'typings/enums';

const StyledWrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  position: relative;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.secondaryBackgroundColor};
`;

type RouteProps = RouteProp<BottomTabStackParamList, Screens.FullViewContact>;
type NavProps = StackNavigationProp<BottomTabStackParamList, Screens.FullViewContact>;
interface INavProp {
  navigation: NavProps;
  route: RouteProps;
}

function EditContact({ route }: INavProp) {
  const [avatar, setAvatar] = useState<string>('');
  const [isForSubmitting, setIsFormSubmitting] = useState<boolean>(false);
  const [contactEdit, setContactEdit] = useState<null | ICreateContactData>(null);
  const { userData } = useSelector((state: RootState) => state.users);
  const [navigation] = useNavigationHook(Screens.EditContact);
  const [dispatch] = useDispatchHook();

  const { contacts, isLoadingContact } = useSelector((state: RootState) => state.contacts);

  const id = userData.uid;

  const formContactEditSubmit = ({ dataEdit, avatarLink }: IContactDataEdit) => {
    if (contactEdit) {
      const avatarEditId = uidCleaner(contactEdit.id);
      dispatch(EditContactAction(dataEdit));

      avatarLink.length &&
        avatarLink !== avatar &&
        dispatch(
          UploadContactImageAction({
            id: contactEdit.id,
            userAvatar: avatarLink,
            avatarId: avatarEditId,
          }),
        );
    }

    setIsFormSubmitting(true);
  };

  const redirectHandler = () => {
    if (contactEdit) {
      dispatch(clearLoadingContact());
      const contact = contacts?.find((item: ICreateContactData) => item.id === contactEdit.id);
      const params = { contact };
      //@ts-ignore
      navigation.navigate(Screens.FullViewContact, params);
    }
  };

  useEffect(() => {
    //@ts-ignore
    const { contact, avatar } = route.params;
    setContactEdit(contact);
    setAvatar(avatar);
  }, [route]);

  useEffect(() => {
    if (!isLoadingContact) {
      redirectHandler();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoadingContact]);

  if (!contactEdit) {
    return <Loader />;
  }

  return (
    <ErrorBoundary message={Errors.Error}>
      <TouchableDismissWrappper>
        <StyledWrapper>
          {!isForSubmitting ? (
            <FormContact
              id={id}
              isCreate={false}
              contact={contactEdit}
              avatar={avatar}
              formContactEditSubmit={formContactEditSubmit}
            />
          ) : (
            <Loader />
          )}
        </StyledWrapper>
      </TouchableDismissWrappper>
    </ErrorBoundary>
  );
}

export default EditContact;
