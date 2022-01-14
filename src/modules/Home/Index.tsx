import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from 'redux/store';
import { fetchUsers } from 'redux/reducers/usersReducer';

export default function Home() {
  const { users } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();

  console.log(users, 'users');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
