import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { AppDispstch, RootState } from './store';

type DispatchFunc = () => AppDispstch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;