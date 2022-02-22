import React, { useState, useEffect } from 'react';

import styled from 'styled-components/native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootState } from 'redux/store';
import { useSelector } from 'react-redux';
import Loader from 'components/Loader/Index';
import FormContact from 'components/Forms/FormContact/FormContact';
import { withBackgroundImage } from 'utils/Hocs/withBackgroundImage';
import { IArticleManageData } from 'typings/interfaces';
import { Screens } from 'typings/enums';
import TouchableDismissWrappper from 'utils/TouchableDismissWrappper';
import ErrorBoundary from 'utils/ErrorBoundary';
import { Errors } from 'typings/enums';
import { BottomTabStackParamList } from 'navigations/Index';

const StyledWrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  position: relative;
  padding: 20px;
`;

type RouteProps = RouteProp<BottomTabStackParamList, Screens.FullViewContact>;
type NavProps = StackNavigationProp<BottomTabStackParamList, Screens.FullViewContact>;
export type ArticleEditType = Pick<
  IArticleManageData,
  'id' | 'title' | 'description' | 'info' | 'userId'
>;
interface INavProp {
  navigation: NavProps;
  route: RouteProps;
}

function EditContact({ route }: INavProp) {
  const [avatar, setAvatar] = useState<string>('');
  const [contact, setContact] = useState<any>(null);
  const { userData } = useSelector((state: RootState) => state.users);

  const id = userData.uid;

  useEffect(() => {
    //@ts-ignore
    const { contact, avatar } = route.params;
    setContact(contact);
    setAvatar(avatar);
  }, [route]);

  if (!contact) {
    return <Loader />;
  }

  return (
    <ErrorBoundary message={Errors.Error}>
      <TouchableDismissWrappper>
        <StyledWrapper>
          <FormContact id={id} isCreate={false} contact={contact} avatar={avatar} />
        </StyledWrapper>
      </TouchableDismissWrappper>
    </ErrorBoundary>
  );
}

export default withBackgroundImage(EditContact);
