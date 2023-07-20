import { AppThunk, AppDispatch } from './../types/index';
import {
  login,
  logout,
  register,
  getUserData,
  patchUserData,
} from '../../utils/burger-api';
import { deleteCookie, setCookie } from '../../utils/cookie';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_DATA_REQUEST,
  USER_LOGIN_FAILED,
  USER_REGISTER_FAILED,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_DATA_SUCCESS,
  USER_DATA_FAILED,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILED,
  CLEAR_USER_ERROR,
} from '../constans';

interface IUserLoginRequestAction {
  readonly type: typeof USER_LOGIN_REQUEST;
}

interface IUserLoginSuccessAction {
  readonly type: typeof USER_LOGIN_SUCCESS;
  readonly payload: {
    success: boolean;
    token: string;
  };
}

interface IUserLoginFailedAction {
  readonly type: typeof USER_LOGIN_FAILED;
  readonly payload: {
    error: string;
    success: boolean;
  };
}

interface IUserRegisterRequestAction {
  readonly type: typeof USER_REGISTER_REQUEST;
}

interface IUserRegisterSuccessAction {
  readonly type: typeof USER_REGISTER_SUCCESS;
  readonly payload: {
    token: string;
    success: boolean;
  };
}

interface IUserRegisterFailedAction {
  readonly type: typeof USER_REGISTER_FAILED;
  readonly payload: {
    error: string;
    success: boolean;
  };
}

interface IUserDataRequestAction {
  readonly type: typeof USER_DATA_REQUEST;
}

interface IUserDataSuccessAction {
  readonly type: typeof USER_DATA_SUCCESS;
  readonly payload: {
    success: boolean;
    user: {
      name: string;
      email: string;
    };
  };
}

interface IUserDataFailedAction {
  readonly type: typeof USER_DATA_FAILED;
  readonly payload: {
    error: string;
    success: boolean;
  };
}

interface IUserLogoutRequestAction {
  readonly type: typeof USER_LOGOUT_REQUEST;
}

interface IUserLogoutSuccessAction {
  readonly type: typeof USER_LOGOUT_SUCCESS;
  readonly payload: {
    success: boolean;
    message: string;
  };
}

interface IUserLogoutFailedAction {
  readonly type: typeof USER_LOGOUT_FAILED;
  readonly payload: {
    success: boolean;
    error: string;
  };
}

interface IClearUserErrorAction {
  readonly type: typeof CLEAR_USER_ERROR;
}

export type TUserActions =
  | IUserLoginRequestAction
  | IUserLoginSuccessAction
  | IUserLoginFailedAction
  | IUserRegisterRequestAction
  | IUserRegisterSuccessAction
  | IUserRegisterFailedAction
  | IUserDataRequestAction
  | IUserDataSuccessAction
  | IUserDataFailedAction
  | IUserLogoutRequestAction
  | IUserLogoutSuccessAction
  | IUserLogoutFailedAction
  | IClearUserErrorAction;

export const clearUserErrorAction = (): IClearUserErrorAction => ({
  type: CLEAR_USER_ERROR,
});

export const userLoginSuccessAction = (payload: {
  success: boolean;
  token: string;
}): IUserLoginSuccessAction => ({
  type: USER_LOGIN_SUCCESS,
  payload,
});

export const userLoginFailedAction = (payload: {
  error: string;
  success: boolean;
}): IUserLoginFailedAction => ({
  type: USER_LOGIN_FAILED,
  payload,
});

export const userLoginRequestAction = (): IUserLoginRequestAction => ({
  type: USER_LOGIN_REQUEST,
});

export const userRegisterRequestAction = (): IUserRegisterRequestAction => ({
  type: USER_REGISTER_REQUEST,
});

export const userRegisterSuccessAction = (payload: {
  token: string;
  success: boolean;
}): IUserRegisterSuccessAction => ({
  type: USER_REGISTER_SUCCESS,
  payload,
});

export const userRegisterFailedAction = (payload: {
  error: string;
  success: boolean;
}): IUserRegisterFailedAction => ({
  type: USER_REGISTER_FAILED,
  payload,
});

export const userDataRequestAction = (): IUserDataRequestAction => ({
  type: USER_DATA_REQUEST,
});

export const userDataSuccessAction = (payload: {
  success: boolean;
  user: { name: string; email: string };
}): IUserDataSuccessAction => ({
  type: USER_DATA_SUCCESS,
  payload,
});

export const userDataFailedAction = (payload: {
  error: string;
  success: boolean;
}): IUserDataFailedAction => ({
  type: USER_DATA_FAILED,
  payload,
});

export const userLogoutRequestAction = (): IUserLogoutRequestAction => ({
  type: USER_LOGOUT_REQUEST,
});

export const userLogoutSuccessAction = (payload: {
  success: boolean;
  message: string;
}): IUserLogoutSuccessAction => ({
  type: USER_LOGOUT_SUCCESS,
  payload,
});

export const userLogoutFailedAction = (payload: {
  error: string;
  success: boolean;
}): IUserLogoutFailedAction => ({
  type: USER_LOGOUT_FAILED,
  payload,
});

export const userLogin: AppThunk = (data) => (dispatch: AppDispatch) => {
  dispatch(userLoginRequestAction());
  login(data)
    .then((res) => {
      localStorage.setItem('refreshToken', res.refreshToken);
      setCookie('accessToken', res.accessToken);
      dispatch(
        userLoginSuccessAction({
          success: res.success,
          token: res.accessToken,
        })
      );
    })
    .catch((error) => {
      dispatch(
        userLoginFailedAction({
          error: error.message,
          success: error.success,
        })
      );
    });
};

export const userRegister: AppThunk = (data) => (dispatch: AppDispatch) => {
  dispatch(userRegisterRequestAction());
  register(data)
    .then((res) => {
      localStorage.setItem('refreshToken', res.refreshToken);
      dispatch(
        userRegisterSuccessAction({
          token: res.accessToken,
          success: res.success,
        })
      );
    })
    .catch((error) => {
      dispatch(
        userRegisterFailedAction({
          error: error.message,
          success: error.success,
        })
      );
    });
};

export const userData: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(userDataRequestAction());
  getUserData()
    .then((res) => {
      if (res && res.success) {
        dispatch(
          userDataSuccessAction({
            success: res.success,
            user: res.user,
          })
        );
      }
    })
    .catch((error) => {
      dispatch(
        userDataFailedAction({
          error: error.message,
          success: error.success,
        })
      );
    });
};

export const updateUserData: AppThunk = (data) => (dispatch: AppDispatch) => {
  dispatch(userDataRequestAction());
  patchUserData(data)
    .then((res) => {
      if (res && res.success) {
        dispatch(
          userDataSuccessAction({
            success: res.success,
            user: res.user,
          })
        );
      }
    })
    .catch((error) => {
      dispatch(
        userDataFailedAction({
          error: error.message,
          success: error.success,
        })
      );
    });
};

export const userLogout: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(userLogoutRequestAction());
  logout()
    .then((res) => {
      dispatch(
        userLogoutSuccessAction({
          success: res.success,
          message: res.message,
        })
      );
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
