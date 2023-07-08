import { IOwner, TOrderStatus } from './../interfaces/order';
import { IIngredient } from '../interfaces/ingredient';
import { getCookie, setCookie } from './cookie';

const NORMA_API = 'https://norma.nomoreparties.space/api';
const HEADERS = {
  'Content-Type': 'application/json',
};

interface IUserData {
  name: string;
  email: string;
  password: string;
}

type TUserLoginData = Omit<IUserData, 'name'>;

type TUpdateUserData = Omit<IUserData, 'password'>;

interface IPasswordData {
  token: string;
  password: string;
}

type TResponse<T> = {
  success: boolean;
} & T;

type TIngredientResponse = {
  data: IIngredient[];
};

type TMessageRespnose = {
  message: string;
};

type TLoginResponse = {
  user: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
};

type TTokenResponse = Omit<TLoginResponse, 'user'>;

type TOrderResponse = {
  name: string;
  order: {
    createdAt: string;
    ingredients: IIngredient[];
    name: string;
    number: number;
    owner: IOwner;
    price: number;
    status: TOrderStatus;
    updatedAt: string;
    _id: string;
  };
};

const checkResponse = <T>(res: Response) => {
  return res.ok
    ? res.json().then((data) => data as TResponse<T>)
    : res.json().then((err) => Promise.reject(err));
};

export function loadIngredients(): Promise<any> {
  return fetch(`${NORMA_API}/ingredients`).then(
    checkResponse<TIngredientResponse>
  );
}

export function checkout(data: { ingredients: string[] }): Promise<any> {
  return fetchWithRefresh<TOrderResponse>(`${NORMA_API}/orders`, {
    method: 'POST',
    headers: {
      ...HEADERS,
      Authorization: getCookie('accessToken'),
    },
    body: JSON.stringify(data),
  });
}

export function forgotPassword(data: { email: string }): Promise<any> {
  return fetch(`${NORMA_API}/password-reset`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(data),
  }).then(checkResponse<TMessageRespnose>);
}

export function resetPassword(data: IPasswordData): Promise<any> {
  return fetch(`${NORMA_API}/password-reset/reset`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(data),
  }).then(checkResponse<TMessageRespnose>);
}

export function login(data: TUserLoginData): Promise<any> {
  return fetch(`${NORMA_API}/auth/login`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(data),
  }).then(checkResponse<TLoginResponse>);
}

export function register(data: IUserData): Promise<any> {
  return fetch(`${NORMA_API}/auth/register`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(data),
  }).then(checkResponse<TLoginResponse>);
}

export function refreshToken(): Promise<any> {
  const token = localStorage.getItem('refreshToken');
  return fetch(`${NORMA_API}/auth/token`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      token,
    }),
  }).then(checkResponse<TTokenResponse>);
}

export function logout(): Promise<any> {
  return fetch(`${NORMA_API}/auth/logout`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  }).then(checkResponse<TMessageRespnose>);
}

export function getUserData(): Promise<any> {
  return fetchWithRefresh<TUpdateUserData>(`${NORMA_API}/auth/user`, {
    method: 'GET',
    headers: {
      Authorization: getCookie('accessToken'),
    },
  });
}

export function patchUserData(data: IUserData): Promise<any> {
  return fetchWithRefresh<TUpdateUserData>(`${NORMA_API}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getCookie('accessToken'),
    },
    body: JSON.stringify(data),
  });
}

const fetchWithRefresh = async <T>(
  url: string,
  options: RequestInit
): Promise<any> => {
  try {
    const res = await fetch(url, options);
    return await checkResponse<T>(res);
  } catch (err: any) {
    if (err.message === 'jwt expired') {
      const refreshData = await refreshToken();
      localStorage.setItem('refreshToken', refreshData.refreshToken);
      setCookie('accessToken', refreshData.accessToken);
      options.headers = {
        ...options.headers,
        authorization: refreshData.accessToken,
      };
      const res = await fetch(url, options);
      return await checkResponse<T>(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export function getOrderDetails(orderNumber: string): Promise<any> {
  return fetch(`${NORMA_API}/orders/${orderNumber}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(checkResponse);
}
