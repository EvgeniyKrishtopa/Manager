import React from 'react';

import styled from 'styled-components/native';
import LogOutButton from 'components/LogOut/Index';
import SettingsButton from 'components/Settings/Index';

interface IHeaderRight {
  isFromFullView?: boolean;
}
const StyledWrapper = styled.View<IHeaderRight>`
  flex-direction: row;
  justify-content: flex-end;
  margin-right: ${(props) => (props.isFromFullView ? '-18px' : '3px')};
`;

export default function HeaderRight({ isFromFullView = false }: IHeaderRight) {
  return (
    <StyledWrapper isFromFullView={isFromFullView}>
      <SettingsButton />
      <LogOutButton />
    </StyledWrapper>
  );
}
