import React from 'react';

import styled from 'styled-components/native';
import { IAddress } from './Index';

const StyledAddressWrapper = styled.View`
  top: 10px;
  left: 40px;
  align-items: flex-start;
  position: absolute;
  padding: 5px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.primary};
  min-width: 180px;
`;

const StyledTextCountry = styled.Text`
  font-size: 18px;
  margin-bottom: 3px;
  font-family: ${(props) => props.theme.fonts.primaryBold};
  color: ${(props) => props.theme.colors.secondaryTextColor};
`;
const StyledTextCity = styled.Text`
  font-size: 16px;
  margin-bottom: 3px;
  font-family: ${(props) => props.theme.fonts.secondaryMedium};
  color: ${(props) => props.theme.colors.secondaryTextColor};
`;
const StyledTextStreet = styled.Text`
  font-size: 14px;
  margin-bottom: 3px;
  font-family: ${(props) => props.theme.fonts.secondaryThin};
  color: ${(props) => props.theme.colors.secondaryTextColor};
`;

interface IAddressProps {
  address: IAddress;
}

export default function Address({ address }: IAddressProps) {
  const { country, city, street } = address;

  return (
    <StyledAddressWrapper>
      {country && country.length > 0 ? <StyledTextCountry>{country}</StyledTextCountry> : null}
      {city && city.length > 0 ? <StyledTextCity>{city}</StyledTextCity> : null}
      {street && street.length > 0 ? <StyledTextStreet>{street}</StyledTextStreet> : null}
    </StyledAddressWrapper>
  );
}
