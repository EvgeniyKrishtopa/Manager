import { store } from 'redux/store';
import { useDispatch } from 'react-redux';

type AppDispatch = typeof store.dispatch;

export const useDispatchHook = () => {
  const dispatch = useDispatch<AppDispatch>();
  return [dispatch];
};
