import { login, register } from '../../utils/burger-api';

export const USER_REQUEST = 'USER_REQUEST';
export const USER_SUCCESS = 'USER_SUCCESS';
export const USER_FAILED = 'USER_FAILED';

export function userLogin(data) {
  return function (dispatch) {
    dispatch({
      type: USER_REQUEST,
    });
    login(data)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: USER_SUCCESS,
            payload: {
              user: res.user,
              accessToken: res.accessToken,
              refreshToken: res.refreshToken,
              success: res.success,
            },
          });
        } else {
          dispatch({
            type: USER_FAILED,
            payload: {
              error: res.message,
              success: res.success,
            },
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: USER_FAILED,
          payload: {
            error: error.message,
            success: error.success,
          },
        });
      });
  };
}

export function userRegister(data) {
  return function (dispatch) {
    dispatch({
      type: USER_REQUEST,
    });
    register(data)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: USER_SUCCESS,
            payload: {
              user: res.user,
              accessToken: res.accessToken,
              refreshToken: res.refreshToken,
              success: res.success,
            },
          });
        } else {
          dispatch({
            type: USER_FAILED,
            payload: {
              error: res.message,
              success: res.success,
            },
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: USER_FAILED,
          payload: {
            error: error.message,
            success: error.success,
          },
        });
      });
  };
}
