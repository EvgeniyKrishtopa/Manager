import React, { useState } from 'react';

import { useTheme } from 'styled-components';
import styled from 'styled-components/native';

import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Map from './Map';
import { ILocationProps } from 'typings/interfaces';

export interface IAddress {
  country: string | null;
  city: string | null;
  street: string | null;
}

const StyledCheckboxWrapper = styled.View`
  margin-bottom: 20px;
  justify-content: center;
  width: 100%;
  align-items: center;
`;

export default function MapView({ location, setLocation, isCreate }: ILocationProps) {
  const [isAddMap, setIsAddMap] = useState<boolean>(false);

  const theme = useTheme();

  const textStyle = { color: theme.colors.primary, fontSize: 20, textDecorationLine: 'none' };

  if (!isCreate) {
    return <Map location={location} setLocation={setLocation} />;
  }

  return (
    <StyledCheckboxWrapper>
      <BouncyCheckbox
        size={20}
        fillColor={theme.colors.primary}
        unfillColor={theme.colors.secondaryTextColor}
        text="Add the Location"
        iconStyle={{ color: theme.colors.mainBackgroundColor, borderRadius: 0 }}
        //@ts-ignore
        textStyle={textStyle}
        onPress={(isChecked: boolean) => {
          setIsAddMap(isChecked);
        }}
      />
      {isAddMap ? <Map location={location} setLocation={setLocation} /> : null}
    </StyledCheckboxWrapper>
  );
}
