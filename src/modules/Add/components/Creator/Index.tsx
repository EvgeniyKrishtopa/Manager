import React from 'react';
import styled from 'styled-components/native';
import { IPropsForms } from 'typings/interfaces';
import FormArticle from 'components/Forms/FormArticle/FormArticle';
import FormContact from 'components/Forms/FormContact/FormContact';
import TouchableDismissWrappper from 'utils/TouchableDismissWrappper';

const StyledWrapper = styled.View`
  padding: 10px 30px;
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
`;

export default function Creator({ id, type }: IPropsForms) {
  return (
    <TouchableDismissWrappper>
      <StyledWrapper>
        {type === 'contact' ? <FormContact id={id} /> : <FormArticle id={id} />}
      </StyledWrapper>
    </TouchableDismissWrappper>
  );
}
