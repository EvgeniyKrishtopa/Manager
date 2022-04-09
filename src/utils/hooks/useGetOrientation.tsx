import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { OrientationList } from 'typings/enums';

export const useGetOrientation = () => {
  const { orientation } = useSelector((state: RootState) => state.users);

  if (
    orientation === OrientationList.landscapeLeft ||
    orientation === OrientationList.landscapeRight
  ) {
    return { orientation: 'Landscape' };
  } else {
    return { orientation: 'Portrait' };
  }
};
