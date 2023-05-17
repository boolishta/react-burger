const initialStore = {
  name: 'Марк',
  email: 'mail@stellar.burgers',
  password: 'password',
};

export const userReducer = (state = initialStore, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};
