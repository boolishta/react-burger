const initialStore = {
  ingredients: [],
  currentIngredients: [],
  currentIngredient: {},
  order: {},
};

export const storeReducer = (state = initialStore, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};
