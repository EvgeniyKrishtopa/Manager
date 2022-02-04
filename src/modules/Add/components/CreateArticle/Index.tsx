import React from 'react';
import styled from 'styled-components/native';
import { IPropsCreateArticle } from 'typings/interfaces';
import CreateArticleFrom from 'components/Forms/CreateArticleForm';

const StyledWrapper = styled.View`
  padding: 30px;
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
`;
export default function CreateArticle({ id }: IPropsCreateArticle) {
  return (
    <StyledWrapper>
      <CreateArticleFrom id={id} />
    </StyledWrapper>
  );
}
