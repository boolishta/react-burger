import {
  WS_USER_NAME_UPDATE,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from '../actions';
import { getCurrentTimestamp } from '../../utils/datetime';
const initialState = {
  wsConnected: false,
  messages: [],
  user: {},
  error: '',
};

export const wsReducer = (state = initialState, action) => {
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
            message: action.payload,
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
