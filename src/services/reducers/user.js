import {
  USER_LOGIN_FAILED,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAILED,
  USER_DATA_REQUEST,
  USER_DATA_SUCCESS,
  USER_DATA_FAILED,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILED,
  USER_REFRESH_TOKEN_REQUEST,
  USER_REFRESH_TOKEN_SUCCESS,
  USER_REFRESH_TOKEN_FAILED,
} from '../actions/user';

const initialStore = {
  userLoginSuccess: false,
  userLoginRequest: false,
  userLoginFailed: false,
  userRegisterSuccess: false,
  userRegisterRequest: false,
  userRegisterFailed: false,
  userDataSuccess: false,
  userDataRequest: false,
  userDataFailed: false,
  userLogoutSuccess: false,
  userLogoutRequest: false,
  userLogoutFailed: false,
  userRefreshTokenSuccess: false,
  userRefreshTokenRequest: false,
  userRefreshTokenFailed: false,
  user: null,
  error: null,
  token: null,
  message: null,
};

export const userReducer = (state = initialStore, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST: {
      return {
        ...state,
        userLoginRequest: true,
      };
    }
    case USER_LOGIN_SUCCESS: {
      return {
        ...state,
        userLoginFailed: false,
        userLoginRequest: false,
        userLoginSuccess: action.payload.success,
        token: action.payload.token,
      };
    }
    case USER_LOGIN_FAILED: {
      return {
        ...state,
        userLoginFailed: true,
        userLoginRequest: false,
        error: action.payload.error,
        userLoginSuccess: action.payload.success,
      };
    }
    case USER_REGISTER_REQUEST: {
      return {
        ...state,
        userRegisterSuccess: true,
      };
    }
    case USER_REGISTER_SUCCESS: {
      return {
        ...state,
        userRegisterFailed: false,
        userRegisterRequest: false,
        userRegisterSuccess: action.payload.success,
        token: action.payload.token,
      };
    }
    case USER_REGISTER_FAILED: {
      return {
        ...state,
        userRegisterFailed: true,
        userRegisterRequest: false,
        error: action.payload.error,
        userRegisterSuccess: action.payload.success,
      };
    }
    case USER_DATA_REQUEST: {
      return {
        ...state,
        userDataRequest: true,
      };
    }
    case USER_DATA_SUCCESS: {
      return {
        ...state,
        userDataFailed: false,
        userDataRequest: false,
        userDataSuccess: action.payload.success,
        user: action.payload.user,
      };
    }
    case USER_DATA_FAILED: {
      return {
        ...state,
        userDataFailed: true,
        userDataRequest: false,
        userDataSuccess: action.payload.success,
        error: action.payload.error,
      };
    }
    case USER_LOGOUT_REQUEST: {
      return {
        ...state,
        userLogoutRequest: true,
      };
    }
    case USER_LOGOUT_SUCCESS: {
      return {
        ...state,
        userLogoutFailed: false,
        userLogoutRequest: false,
        userLogoutSuccess: action.payload.success,
        message: action.payload.message,
      };
    }
    case USER_LOGOUT_FAILED: {
      return {
        ...state,
        userLogoutFailed: true,
        userLogoutRequest: false,
        userLogoutSuccess: action.payload.success,
        error: action.payload.error,
      };
    }
    case USER_REFRESH_TOKEN_REQUEST: {
      return {
        ...state,
        userRefreshTokenRequest: true,
      };
    }
    case USER_REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        userRefreshTokenFailed: false,
        userRefreshTokenRequest: false,
        userRefreshTokenSuccess: action.payload.success,
        token: action.payload.token,
      };
    }
    case USER_REFRESH_TOKEN_FAILED: {
      return {
        ...state,
        userRefreshTokenFailed: true,
        userRefreshTokenRequest: false,
        userRefreshTokenSuccess: action.payload.success,
        error: action.payload.error,
      };
    }
    default: {
      return state;
    }
  }
};
