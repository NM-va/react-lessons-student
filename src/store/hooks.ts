import { useDispatch } from 'react-redux';
import { AppDispatch, store } from './index';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const dispatch = store.dispatch as AppDispatch;