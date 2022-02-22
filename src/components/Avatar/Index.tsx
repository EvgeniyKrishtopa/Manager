import React, { Dispatch, SetStateAction, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { AvatarUpload } from 'typings/enums';
import { useTheme } from 'styled-components';
import styled from 'styled-components/native';
import ImageFullViewer from 'components/ImageFullViewer/Index';

interface IProps {
  setValue: Dispatch<SetStateAction<string>>;
  value: string;
}

type ButtonSaveProps = {
  isImage: boolean;
};

const StyledWrapper = styled.View`
  align-items: center;
  margin-bottom: 30px;
`;

const StyledAvatar = styled.Image`
  width: 120px;
  height: 120px;
`;

const StyledAvatarHolder = styled.TouchableOpacity`
  border-width: 2px;
  border-style: solid;
  border-radius: 70px;
  overflow: hidden;
  margin-top: 10px;
  border-color: ${(props) => props.theme.colors.mainTextColor};
`;

const StyledSaveButton = styled.TouchableOpacity<ButtonSaveProps>`
  margin-bottom: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  top: ${(props) => (!props.isImage ? '-15px' : '5px')};
`;

const StyledText = styled.Text`
  fontSize: 16px;
  font-family: ${(props) => props.theme.fonts.primaryBold}
  color: ${(props) => props.theme.colors.mainTextColor};
`;

export default function Avatar({ setValue, value }: IProps) {
  const theme = useTheme();
  const [isFullImageOpen, setIsFullImageOpen] = useState<boolean>(false);

  const onOpenFullImage = () => {
    setIsFullImageOpen(true);
  };

  const openImagePickerAsync = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.cancelled) {
      setValue(pickerResult.uri);
    }
  };

  return (
    <StyledWrapper>
      {value.length ? (
        <StyledAvatarHolder onPress={onOpenFullImage}>
          <StyledAvatar
            source={{
              uri: value,
            }}
          />
        </StyledAvatarHolder>
      ) : (
        <Ionicons name="person-circle-outline" size={145} color={theme.colors.primary} />
      )}
      <StyledSaveButton onPress={openImagePickerAsync} isImage={value.length > 0}>
        <StyledText>
          {value.length ? AvatarUpload.ChangePhoto : AvatarUpload.UploadAvatar}
        </StyledText>
      </StyledSaveButton>
      <ImageFullViewer urlValue={value} openFullViewImage={isFullImageOpen} />
    </StyledWrapper>
  );
}
