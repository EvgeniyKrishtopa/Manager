import React from 'react';

import { Entypo } from '@expo/vector-icons';
import { useTheme } from 'styled-components';

export default function CustomMarker() {
  const theme = useTheme();

  return <Entypo name="location-pin" size={54} color={theme.colors.primary} />;
}
