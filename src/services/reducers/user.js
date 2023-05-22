import { USER_FAILED, USER_REQUEST, USER_SUCCESS } from '../actions/user';

const initialStore = {
  success: false,
  userRequest: false,
  userFailed: false,
  accessToken: '',
  refreshToken: '',
  user: {
    email: '',
    name: '',
  },
  error: null,
};

export const userReducer = (state = initialStore, action) => {
  switch (action.type) {
    case USER_REQUEST: {
      return {
        ...state,
        userRequest: true,
      };
    }
    case USER_SUCCESS: {
      return {
        ...state,
        userFailed: false,
        userRequest: false,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        success: action.payload.success,
      };
    }
    case USER_FAILED: {
      return {
        ...state,
        userFailed: true,
        userRequest: false,
        error: action.payload.error,
        success: action.payload.success,
      };
    }
    default: {
      return state;
    }
  }
};
