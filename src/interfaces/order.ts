import { IIngredient } from './ingredient';

export interface IOwner {
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export type TOrderStatus = 'done' | 'pending' | 'created';

export interface IOrder {
  ingredients: string[];
  _id: string;
  owner: IOwner;
  status: TOrderStatus;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  price: number;
}

export interface IHistoryOrder {
  id: string;
  name: string;
  number: number;
  date: string;
  ingredients: IIngredient[];
}

export type TOrderDetails = {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  owner: string;
  status: TOrderStatus;
  updatedAt: string;
  _id: string;
};

export type TWsOrder = Omit<TOrderDetails, 'owner'>;
