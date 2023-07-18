import { useDispatch as dispatchHook } from 'react-redux';
import { AppDispatch, AppThunk } from '../types';
// TODO
export const useDispatch = () => dispatchHook<any>();
