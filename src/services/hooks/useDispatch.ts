import { useDispatch as dispatchHook } from 'react-redux';
import { AppDispatch, AppThunk } from '../types';

type TDispatchFunc = () => AppDispatch | AppThunk;
export const useDispatch: TDispatchFunc = dispatchHook;
