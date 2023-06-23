import PropTypes from 'prop-types';

export const ingredientType = PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number,
  image: PropTypes.string,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  __v: PropTypes.number,
});

export const ingredientsType = PropTypes.arrayOf(ingredientType).isRequired;

export const orderType = PropTypes.shape({
  date: PropTypes.string,
  id: PropTypes.string,
  ingredients: ingredientsType,
  name: PropTypes.string,
  number: PropTypes.number,
});

export const ordersType = PropTypes.arrayOf(orderType).isRequired;
