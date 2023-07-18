import { getCookie } from '../../utils/cookie';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
  WS_USER_NAME_UPDATE,
} from '../constans';
import { TWsMessage } from '../reducers/wsReducer';

interface IWsConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
}

interface IWsConnectionStartWithTokenAction {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: {
    token: string;
  };
}

interface IWsConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

interface IWsConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
}

interface IWsConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

interface IWsGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: {
    message: TWsMessage;
  };
}

interface IWsSendMessageAction {
  readonly type: typeof WS_SEND_MESSAGE;
  readonly payload: {
    message: string;
  };
}

interface IWsUserNameUpdateAction {
  readonly type: typeof WS_USER_NAME_UPDATE;
  readonly payload: {
    userName: string;
  };
}

export type TWsActions =
  | IWsConnectionStartAction
  | IWsConnectionStartWithTokenAction
  | IWsConnectionSuccessAction
  | IWsConnectionErrorAction
  | IWsConnectionClosedAction
  | IWsGetMessageAction
  | IWsSendMessageAction
  | IWsUserNameUpdateAction;

export const wsConnectionStart = (): IWsConnectionStartAction => {
  return {
    type: WS_CONNECTION_START,
  };
};

export const wsConnectionStartWithToken =
  (): IWsConnectionStartWithTokenAction => {
    const token = getCookie('accessToken');
    return {
      type: WS_CONNECTION_START,
      payload: {
        token: token.slice('Bearer'.length).trim(),
      },
    };
  };

export const wsConnectionSuccess = (): IWsConnectionSuccessAction => {
  return {
    type: WS_CONNECTION_SUCCESS,
  };
};

export const wsConnectionError = (): IWsConnectionErrorAction => {
  return {
    type: WS_CONNECTION_ERROR,
  };
};

export const wsConnectionClosed = (): IWsConnectionClosedAction => {
  return {
    type: WS_CONNECTION_CLOSED,
  };
};

export const wsGetMessage = (payload: {
  message: TWsMessage;
}): IWsGetMessageAction => {
  return {
    type: WS_GET_MESSAGE,
    payload,
  };
};

export const wsSendMessage = (payload: {
  message: string;
}): IWsSendMessageAction => {
  return {
    type: WS_SEND_MESSAGE,
    payload,
  };
};

export const wsUserNameUpdate = (payload: {
  userName: string;
}): IWsUserNameUpdateAction => {
  return {
    type: WS_USER_NAME_UPDATE,
    payload,
  };
};
