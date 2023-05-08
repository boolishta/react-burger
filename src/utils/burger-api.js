const NORMA_API = 'https://norma.nomoreparties.space/api';

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export function fetchIngredients() {
  return fetch(`${NORMA_API}/ingredients`).then(checkReponse);
}

export function checkout(data) {
  return fetch(`${NORMA_API}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(checkReponse);
}
