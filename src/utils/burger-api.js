import { getCookie, setCookie } from './cookie';

const NORMA_API = 'https://norma.nomoreparties.space/api';
const HEADERS = {
  'Content-Type': 'application/json',
};

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export function fetchIngredients() {
  return fetch(`${NORMA_API}/ingredients`).then(checkReponse);
}

export function checkout(data) {
  return fetchWithRefresh(`${NORMA_API}/orders`, {
    method: 'POST',
    headers: {
      ...HEADERS,
      Authorization: getCookie('accessToken'),
    },
    body: JSON.stringify(data),
  });
}

export function forgotPassword(data) {
  return fetch(`${NORMA_API}/password-reset`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(data),
  }).then(checkReponse);
}

export function resetPassword(data) {
  return fetch(`${NORMA_API}/password-reset/reset`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(data),
  }).then(checkReponse);
}

export function login(data) {
  return fetch(`${NORMA_API}/auth/login`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(data),
  }).then(checkReponse);
}

export function register(data) {
  return fetch(`${NORMA_API}/auth/register`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(data),
  }).then(checkReponse);
}

export function refreshToken() {
  const token = localStorage.getItem('refreshToken');
  return fetch(`${NORMA_API}/auth/token`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      token,
    }),
  }).then(checkReponse);
}

export function logout() {
  return fetch(`${NORMA_API}/auth/logout`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  }).then(checkReponse);
}

export function getUserData() {
  return fetchWithRefresh(`${NORMA_API}/auth/user`, {
    method: 'GET',
    headers: {
      Authorization: getCookie('accessToken'),
    },
  });
}

export function patchUserData(data) {
  return fetchWithRefresh(`${NORMA_API}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getCookie('accessToken'),
    },
    body: JSON.stringify(data),
  });
}

const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkReponse(res);
  } catch (err) {
    if (err.message === 'jwt expired') {
      const refreshData = await refreshToken();
      localStorage.setItem('refreshToken', refreshData.refreshToken);
      setCookie('accessToken', refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkReponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export function getOrderDetails(orderNumber) {
  return fetch(`${NORMA_API}/orders/${orderNumber}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(checkReponse);
}
