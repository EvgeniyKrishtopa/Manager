import React, { useEffect, useState } from 'react';

import { FlatList, RefreshControl } from 'react-native';
import { RootState } from 'redux/store';
import { useSelector } from 'react-redux';
import { FetchContactsAction } from 'redux/reducers/contactsUserReducer';
import { useTheme } from 'styled-components';
import { StyledTitle, StyledItemsWrapper, StyledNoItemsYet } from 'components/Styled/Index';
import Loader from 'components/Loader/Index';
import Contact from './components/Contact/Index';

import { useDispatchHook } from 'utils/Hooks/useDispatchHook';
import { useNavigationHook } from 'utils/Hooks/useNavigationHook';
import { withBackgroundImage } from 'utils/Hocs/withBackgroundImage';
import ErrorBoundary from 'utils/ErrorBoundary';
import { Screens, Errors } from 'typings/enums';
import { ICreateContactData } from 'typings/interfaces';

function Contacts() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const { userData } = useSelector((state: RootState) => state.users);
  const { contacts, avatars } = useSelector((state: RootState) => state.contacts);
  const [navigation] = useNavigationHook(Screens.Articles);
  const [dispatch] = useDispatchHook();

  const theme = useTheme();

  const getDataRequest = () => dispatch(FetchContactsAction({ id: userData.uid }));

  const fetchData = () => {
    getDataRequest();
    setIsFetching(false);
  };

  const refreshFetchData = () => {
    setIsFetching(true);
    fetchData();
  };

  const openFullScreen = (id: string) => {
    if (contacts) {
      const contact = contacts.find((item: ICreateContactData) => item.id === id);
      const params = { contact };
      //@ts-ignore
      navigation.navigate(Screens.FullViewContact, params);
    }
  };

  useEffect(() => {
    if (userData) {
      getDataRequest();
    }
  }, [userData, dispatch]);

  useEffect(() => {
    setIsLoading(false);
  }, [contacts]);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  if (isLoading && !contacts?.length) {
    return <Loader />;
  }

  return (
    <ErrorBoundary message={Errors.Error}>
      <StyledItemsWrapper>
        <StyledTitle>Contacts</StyledTitle>
        <FlatList
          data={contacts}
          renderItem={(item) => (
            <Contact
              item={item}
              userId={userData.uid}
              openFullScreen={openFullScreen}
              avatars={avatars}
            />
          )}
          keyExtractor={(item) => item?.id}
          progressViewOffset={100}
          refreshControl={
            <RefreshControl
              tintColor={theme.colors.primary}
              refreshing={isFetching}
              onRefresh={refreshFetchData}
            />
          }
          ListEmptyComponent={<StyledNoItemsYet>No Contacts Yet!</StyledNoItemsYet>}
        />
      </StyledItemsWrapper>
    </ErrorBoundary>
  );
}

export default withBackgroundImage(Contacts);
