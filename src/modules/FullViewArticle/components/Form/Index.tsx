import React, { useState, Dispatch, SetStateAction } from 'react';

import styled from 'styled-components/native';
import { useTheme } from 'styled-components';

import { StyledInput } from 'components/Styled/Index';

interface IPropsManageArticle {
  title: string;
  description: string;
  info: string;
  setTitleArticle: Dispatch<SetStateAction<string>>;
  setDescriptionArticle: Dispatch<SetStateAction<string>>;
  setInfoArticle: Dispatch<SetStateAction<string>>;
}

const StyledFormWrapper = styled.View`
  padding: 40px 5px 15px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export default function EditArticleForm({
  title,
  description,
  info,
  setTitleArticle,
  setDescriptionArticle,
  setInfoArticle,
}: IPropsManageArticle) {
  const theme = useTheme();

  const [titleHeight, setTitleHeight] = useState(0);
  const [descriptionHeight, setDescriptionHeight] = useState(0);
  const [infoHeight, setInfoHeight] = useState(0);

  return (
    <StyledFormWrapper>
      <StyledInput
        onChangeText={setTitleArticle}
        value={title}
        heightInput={titleHeight}
        maxLength={50}
        editable
        placeholderTextColor={theme.colors.secondaryTextColor}
        onContentSizeChange={(e) => setTitleHeight(e.nativeEvent.contentSize.height + 20)}
      />
      <StyledInput
        onChangeText={setDescriptionArticle}
        value={description}
        heightInput={descriptionHeight}
        multiline
        editable
        placeholderTextColor={theme.colors.secondaryTextColor}
        onContentSizeChange={(e) => setDescriptionHeight(e.nativeEvent.contentSize.height + 20)}
      />
      <StyledInput
        onChangeText={setInfoArticle}
        value={info}
        heightInput={infoHeight}
        secureTextEntry
        multiline
        editable
        onContentSizeChange={(e) => setInfoHeight(e.nativeEvent.contentSize.height + 20)}
      />
    </StyledFormWrapper>
  );
}
