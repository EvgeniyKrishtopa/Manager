import React from 'react';

import styled from 'styled-components/native';

const StyledLogo = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 6px;
  margin-top: -8px;
`;

export default function Logo() {
  return <StyledLogo source={require('../../../assets/logo.png')} />;
}
