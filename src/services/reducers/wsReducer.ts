import { TWsOrder } from '../../interfaces/order';
import { getCurrentTimestamp } from '../../utils/datetime';
import { TWsActions } from '../actions';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_USER_NAME_UPDATE,
} from '../constans';

export type TWsMessage = {
  orders: ReadonlyArray<TWsOrder>;
  total: number;
  totalToday: number;
};

export type TWsState = {
  wsConnected: boolean;
  messages: ReadonlyArray<{ message: TWsMessage; timestamp: number }>;
  user: {};
  error: string;
};

const initialState: TWsState = {
  wsConnected: false,
  messages: [],
  user: {},
  error: '',
};

export const wsReducer = (
  state = initialState,
  action: TWsActions
): TWsState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            message: action.payload.message,
            timestamp: getCurrentTimestamp(),
          },
        ],
      };
    case WS_USER_NAME_UPDATE:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};
