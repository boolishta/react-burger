import { getCookie } from '../../utils/cookie';
const WS_ORDERS_URL = 'wss://norma.nomoreparties.space/orders';

export const socketMiddleware = (wsActions) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsSendMessage, onOpen, onClose, onError, onMessage } =
        wsActions;
      if (type === wsInit) {
        let url = WS_ORDERS_URL;
        if (payload && payload.token) {
          url += `?token=${payload.token}`;
        } else {
          url += '/all';
        }
        socket = new WebSocket(url);
      }
      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsSendMessage) {
          socket.send(
            JSON.stringify({
              ...payload,
              token: getCookie('accessToken'),
            })
          );
        }

        if (type === onClose) {
          socket.close();
        }
      }

      next(action);
    };
  };
};
