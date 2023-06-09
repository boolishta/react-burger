import {
  login,
  logout,
  register,
  getUserData,
  patchUserData,
} from '../../utils/burger-api';
import { deleteCookie, setCookie } from '../../utils/cookie';

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILED = 'USER_LOGIN_FAILED';

export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAILED = 'USER_REGISTER_FAILED';

export const USER_DATA_REQUEST = 'USER_DATA_REQUEST';
export const USER_DATA_SUCCESS = 'USER_DATA_SUCCESS';
export const USER_DATA_FAILED = 'USER_DATA_FAILED';

export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_FAILED = 'USER_LOGOUT_FAILED';

export const CLEAR_USER_ERROR = 'CLEAR_USER_ERROR';

export function userLogin(data) {
  return function (dispatch) {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    login(data)
      .then((res) => {
        localStorage.setItem('refreshToken', res.refreshToken);
        setCookie('accessToken', res.accessToken);
        dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: {
            success: res.success,
            token: res.accessToken,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: USER_LOGIN_FAILED,
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
      type: USER_REGISTER_REQUEST,
    });
    register(data)
      .then((res) => {
        localStorage.setItem('refreshToken', res.refreshToken);
        dispatch({
          type: USER_REGISTER_SUCCESS,
          payload: {
            token: res.accessToken,
            success: res.success,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: USER_REGISTER_FAILED,
          payload: {
            error: error.message,
            success: error.success,
          },
        });
      });
  };
}

export function userData() {
  return function (dispatch) {
    dispatch({
      type: USER_DATA_REQUEST,
    });
    getUserData()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: USER_DATA_SUCCESS,
            payload: {
              success: res.success,
              user: res.user,
            },
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: USER_DATA_FAILED,
          payload: {
            error: error.message,
            success: error.success,
          },
        });
      });
  };
}

export function updateUserData(data) {
  return function (dispatch) {
    dispatch({
      type: USER_DATA_REQUEST,
    });
    patchUserData(data)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: USER_DATA_SUCCESS,
            payload: {
              success: res.success,
              user: res.user,
            },
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: USER_DATA_FAILED,
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
      type: USER_LOGOUT_REQUEST,
    });
    logout()
      .then((res) => {
        dispatch({
          type: USER_LOGOUT_SUCCESS,
          payload: {
            success: res.success,
            message: res.message,
          },
        });
        localStorage.removeItem('refreshToken');
        deleteCookie('accessToken');
      })
      .catch((error) => {
        dispatch({
          type: USER_LOGOUT_FAILED,
          payload: {
            error: error.message,
            success: error.success,
          },
        });
      });
  };
}
