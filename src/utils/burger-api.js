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
  return fetch(`${NORMA_API}/orders`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify(data),
  }).then(checkReponse);
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

export function refreshToken(refreshToken) {
  return fetch(`${NORMA_API}/auth/token`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      token: refreshToken,
    }),
  }).then(checkReponse);
}

export function logout(refreshToken) {
  return fetch(`${NORMA_API}/auth/logout`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      token: refreshToken,
    }),
  }).then(checkReponse);
}

export function getUserData(token) {
  return fetch(`${NORMA_API}/auth/user`, {
    method: 'GET',
    headers: {
      Authorization: token,
    },
  }).then(checkReponse);
}

export function patchUserData(token, data) {
  return fetch(`${NORMA_API}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(data),
  }).then(checkReponse);
}
