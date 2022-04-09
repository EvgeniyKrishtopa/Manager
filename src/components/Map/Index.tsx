import React, { useState, useEffect } from 'react';

import { useTheme } from 'styled-components';
import styled from 'styled-components/native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import Map from './Map';
import { useGetOrientation } from 'utils/Hooks/useGetOrientation';
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

export default function MapView({ location, setLocation }: ILocationProps) {
  const [isAddMap, setIsAddMap] = useState<boolean>(false);
  const { orientation } = useGetOrientation();

  const theme = useTheme();

  const textStyle = { color: theme.colors.primary, fontSize: 20, textDecorationLine: 'none' };

  useEffect(() => {
    location && setIsAddMap(true);
  }, [location]);

  return (
    <StyledCheckboxWrapper>
      <BouncyCheckbox
        size={20}
        //@ts-ignore
        isChecked={location && true}
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
      {isAddMap ? (
        <Map location={location} setLocation={setLocation} orientation={orientation} />
      ) : null}
    </StyledCheckboxWrapper>
  );
}
