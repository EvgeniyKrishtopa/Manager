import React, { Dispatch, ReactNode, SetStateAction } from 'react';
//@ts-ignore
import { Modal, ModalContent, SlideAnimation } from 'react-native-modals';
import styled from 'styled-components/native';

interface IModalProps {
  isVisible: boolean;
  children: ReactNode;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
}

const StyledModalWrapper = styled.View`
  background-color: ${(props) => props.theme.colors.primary};
  padding: 15px;
  border-radius: 6px;
`;

export default function CustomModal({ isVisible, children, setIsModalVisible }: IModalProps) {
  const onTouchOutsideHandler = () => {
    setIsModalVisible(false);
  };
  return (
    <Modal
      visible={isVisible}
      onTouchOutside={onTouchOutsideHandler}
      modalAnimation={
        new SlideAnimation({
          slideFrom: 'bottom',
        })
      }
      swipeDirection={['up', 'down']}
      swipeThreshold={200}
      onSwipeOut={() => {
        setIsModalVisible(false);
      }}
      modalStyle={{ backgroundColor: 'transparent' }}
    >
      <ModalContent>
        <StyledModalWrapper>{children}</StyledModalWrapper>
      </ModalContent>
    </Modal>
  );
}
