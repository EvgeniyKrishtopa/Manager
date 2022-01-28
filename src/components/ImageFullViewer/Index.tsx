import React, { useState, useEffect } from 'react';
import { Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

interface IProps {
  urlValue: string;
  openFullViewImage: boolean;
}

export default function ImageFullViewer({ urlValue, openFullViewImage }: IProps) {
  const [isFullImageOpen, setIsFullImageOpen] = useState<boolean>(false);

  const images = [
    {
      url: urlValue,
      freeHeight: true,
    },
  ];

  const onCloseFullViewImage = () => {
    setIsFullImageOpen(false);
  };

  useEffect(() => {
    openFullViewImage && setIsFullImageOpen(true);
  }, [openFullViewImage]);

  return (
    <Modal visible={isFullImageOpen} transparent={true}>
      <ImageViewer enableSwipeDown={true} imageUrls={images} onSwipeDown={onCloseFullViewImage} />
    </Modal>
  );
}
