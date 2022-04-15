import React, { useState, useCallback } from 'react';

import { FlatList, RefreshControl } from 'react-native';
import { RootState } from 'redux/store';
import { useSelector } from 'react-redux';
import { FetchContactsAction } from 'redux/reducers/contactsUserReducer';
import { useTheme } from 'styled-components';
import { StyledTitle, StyledItemsWrapper, StyledNoItemsYet } from 'components/Styled/Index';
import Contact from './components/Contact/Index';
import { useDispatchHook } from 'utils/Hooks/useDispatchHook';
import { withBackgroundImage } from 'utils/Hocs/withBackgroundImage';
import ErrorBoundary from 'utils/ErrorBoundary';
import { Errors } from 'typings/enums';

function Contacts() {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const { userData } = useSelector((state: RootState) => state.users);
  const { contacts, avatars } = useSelector((state: RootState) => state.contacts);

  const [dispatch] = useDispatchHook();
  const theme = useTheme();

  const getDataRequest = useCallback(() => {
    dispatch(FetchContactsAction({ id: userData.uid }));
  }, [userData, dispatch]);

  const fetchData = () => {
    getDataRequest();
    setIsFetching(false);
  };

  const refreshFetchData = () => {
    setIsFetching(true);
    fetchData();
  };

  return (
    <ErrorBoundary message={Errors.Error}>
      <StyledItemsWrapper>
        <StyledTitle>Contacts</StyledTitle>
        <FlatList
          data={contacts}
          renderItem={({ item, index }) => (
            <Contact item={item} userId={userData.uid} avatars={avatars} index={index} />
          )}
          keyExtractor={(item) => item?.id}
          progressViewOffset={100}
          initialNumToRender={4}
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
