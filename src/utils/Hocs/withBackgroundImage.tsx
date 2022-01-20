import React, { ComponentType } from 'react';

import styled from 'styled-components/native';

const StyledImageBackground = styled.ImageBackground`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const image = {
  uri: 'https://cdn.pixabay.com/photo/2020/01/02/10/15/background-image-4735444_960_720.png',
};

export function WithBackgroundImage<T>(WrappedComponent: ComponentType<T>) {
  return (props: T) => (
    <StyledImageBackground source={image} resizeMode="cover">
      <WrappedComponent {...props} />
    </StyledImageBackground>
  );
}
