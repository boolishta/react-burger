interface IOwner {
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