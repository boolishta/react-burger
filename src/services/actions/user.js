import { login, logout, register, token } from '../../utils/burger-api';

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
          localStorage.setItem('refreshToken', res.refreshToken);
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

export function userToken() {
  return function (dispatch) {
    dispatch({
      type: USER_REQUEST,
    });
    const refreshToken = localStorage.getItem('refreshToken');
    token({
      token: refreshToken,
    })
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: USER_SUCCESS,
            payload: {
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

export function userLogout() {
  return function (dispatch) {
    dispatch({
      type: USER_REQUEST,
    });
    const refreshToken = localStorage.getItem('refreshToken');
    logout({
      token: refreshToken,
    })
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: USER_SUCCESS,
            payload: {
              success: res.success,
              message: res.message,
            },
          });
          localStorage.removeItem('refreshToken');
        }
      })
      .catch((error) => {
        if (refreshToken) {
          dispatch(userToken());
        } else {
          dispatch({
            type: USER_FAILED,
            payload: {
              error: error.message,
              success: error.success,
            },
          });
        }
      });
  };
}
