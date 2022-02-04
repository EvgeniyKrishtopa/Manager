import React, { useEffect, useState, useLayoutEffect } from 'react';
import { RootState } from 'redux/store';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';
import SaveButton from './components/Save/Index';
import Field from './components/Field/Index';
import Avatar from './components/Avatar/Index';
import { withNotification } from 'utils/Hocs/withNotification';
import TouchableDismissWrappper from 'utils/TouchableDismissWrappper';
import { SettingsLabels, AlertsInfo } from 'typings/enums';

const StyledContainer = styled.View`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  background-color: ${(props) => props.theme.colors.secondaryBackgroundColor};
`;

const StyledTitle = styled.Text`
  font-size: 20px;
  font-family: ${(props) => props.theme.fonts.primaryBold}
  color: ${(props) => props.theme.colors.primary};
  padding-top: 40px;
  margin-bottom: 30px;
  text-transform: uppercase;
`;

function Settings({ navigation }: any) {
  const [name, setName] = useState<any>('');
  const [image, setImage] = useState<string>('');

  const { userData, imageURL } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    if (userData?.providerData?.length) {
      const dataUser = userData.providerData[0];
      dataUser.displayName.length && setName(dataUser.displayName);
    }
    imageURL && setImage(imageURL);
  }, [userData, imageURL]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <SaveButton userName={name} userAvatar={image} />,
    });
  }, [navigation, name, image]);

  return (
    <TouchableDismissWrappper>
      <StyledContainer>
        <StyledTitle>Account Settings</StyledTitle>
        <Avatar value={image} setValue={setImage} />
        <Field type={SettingsLabels.UserName} value={name} setValue={setName} />
      </StyledContainer>
    </TouchableDismissWrappper>
  );
}

export default withNotification({
  textNotification: AlertsInfo.SettingsAction,
  isNotificationErrorVisible: true,
  isNotificationSuccessVisible: true,
})(Settings);
