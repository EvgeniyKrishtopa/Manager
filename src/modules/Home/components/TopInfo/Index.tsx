import React, { useState } from 'react';

import styled from 'styled-components/native';
import { StyledTitle } from 'components/Styled/Index';
import Loader from 'components/Loader/Index';

interface ITopInfo {
  name: string;
  avatar: string;
  onNavigateHandler: () => void;
}

interface IImageLoading {
  isLoading: boolean;
}

const StyledEmptyScreenInfo = styled.Text`
  color: ${(props) => props.theme.colors.secondaryTextColor};
  font-size: 20px;
  font-family: ${(props) => props.theme.fonts.primaryBold};
  margin: 15px auto;
`;

const StyledEmptyScreenLink = styled.Text`
  position: relative;
  top: 4px;
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.mainTextColor};
  font-size: 20px;
  font-family: ${(props) => props.theme.fonts.primaryBold};
`;

const StyledAvatarHolder = styled.View`
  margin: 0 auto;
  border-width: 2px;
  border-style: solid;
  border-radius: 150px;
  overflow: hidden;
  margin-top: 10px;
  border-color: ${(props) => props.theme.colors.mainTextColor};
  width: 150px;
  height: 150px;
`;

const StyledAvatar = styled.Image<IImageLoading>`
  width: 150px;
  height: 150px;
  opacity: ${(props) => (props.isLoading ? '0' : '1')};
  position: ${(props) => (props.isLoading ? 'absolute' : 'relative')};
  left: 0;
  top: 0;
`;

const StyledWrapper = styled.View`
  flex-direction: column;
  padding: 10px 20px;
`;

const StyledDescription = styled.Text`
  font-size: 15px;
  padding-top: 10px;
  text-align: center;
  font-family: ${(props) => props.theme.fonts.primaryMedium};
  color: ${(props) => props.theme.colors.mainTextColor};
`;

const StyledButtonGoToSettings = styled.TouchableOpacity``;

export default function TopInfo({ name, avatar, onNavigateHandler }: ITopInfo) {
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);

  return (
    <StyledWrapper>
      {name?.length ? (
        <>
          <StyledTitle>{`Welcome, ${name}!`}</StyledTitle>
          {avatar?.length ? (
            <StyledAvatarHolder>
              <StyledAvatar
                isLoading={isImageLoading}
                onLoadEnd={() => setIsImageLoading(false)}
                source={{
                  uri: avatar,
                }}
              />
              {isImageLoading && <Loader />}
            </StyledAvatarHolder>
          ) : null}
          <StyledDescription>
            Here you can manage your contacts and other personal information.
          </StyledDescription>
        </>
      ) : (
        <StyledEmptyScreenInfo>
          Welcome! Add more personal infromation{' '}
          <StyledButtonGoToSettings onPress={onNavigateHandler}>
            <StyledEmptyScreenLink>here</StyledEmptyScreenLink>
          </StyledButtonGoToSettings>
        </StyledEmptyScreenInfo>
      )}
    </StyledWrapper>
  );
}
