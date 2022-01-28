import React, { ComponentType } from 'react';

import { useTheme } from 'styled-components';
import styled from 'styled-components/native';

const StyledImageBackground = styled.ImageBackground`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export function withBackgroundImage<T>(WrappedComponent: ComponentType<T>) {
  return (props: T) => {
    const theme = useTheme();

    const image = {
      uri: theme.backgroundUrl,
    };

    return (
      <StyledImageBackground source={image} resizeMode="cover">
        <WrappedComponent {...props} />
      </StyledImageBackground>
    );
  };
}
