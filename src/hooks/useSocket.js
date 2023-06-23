import { useCallback, useRef, useEffect } from 'react';

export const CONNECTING = 'CONNECTING';
export const OPEN = 'OPEN';
export const CLOSING = 'CLOSING';
export const CLOSED = 'CLOSED';

export const socketStates = {
  0: CONNECTING,
  1: OPEN,
  2: CLOSING,
  3: CLOSED,
};

export const useSocket = (url, options) => {
  const ws = useRef(null);

  const connect = useCallback(
    (token) => {
      ws.current = new WebSocket(`${url}?token=${token}`);

      ws.current.onmessage = options.onMessage; // Ваш код здесь

      ws.current.onopen = (event) => {
        if (typeof options.onConnect === 'function') {
          options.onConnect(event);
        }
      };

      ws.current.onerror = (event) => {
        if (typeof options.onError === 'function') {
          options.onError(event);
        }
      };

      ws.current.onclose = (event) => {
        if (typeof options.onDisconnect === 'function') {
          options.onDisconnect(event);
        }
      };
    },
    [url, options]
  );

  useEffect(() => {
    if (ws.current) {
      ws.current.onmessage = options.onMessage; // Ваш код здесь

      if (typeof options.onConnect === 'function') {
        ws.current.onopen = options.onConnect;
      }
      if (typeof options.onError === 'function') {
        ws.current.onerror = options.onError;
      }
      if (typeof options.onDisconnect === 'function') {
        ws.current.onclose = options.onDisconnect;
      }
    }
  }, [options, ws]);

  useEffect(() => {
    return () => {
      if (ws.current && typeof ws.current.close === 'function') {
        ws.current.close();
      }
    };
  }, []);

  const sendData = useCallback(
    (message) => {
      // Ваш код здесь
      ws.current.send(JSON.stringify(message));
    },
    [ws]
  );

  return { connect, sendData };
};
