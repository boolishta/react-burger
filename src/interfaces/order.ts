interface IOwner {
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface IOrder {
  ingredients: string[];
  _id: string;
  owner: IOwner;
  status: 'done' | 'pending';
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  price: number;
}
