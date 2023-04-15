export interface Fruit {
  name: string;
  price: number;
  discount1: number;
  discount2: number;
  amount: number;
}

export const APPLE: Fruit = {
  name: 'apple',
  price: 10000,
  discount1: 5,
  discount2: 10,
  amount: 1,
};

export const ORANGE: Fruit = {
  name: 'orange',
  price: 20000,
  discount1: 10,
  discount2: 15,
  amount: 1,
};

export const GRAPE: Fruit = {
  name: 'grape',
  price: 50000,
  discount1: 20,
  discount2: 25,
  amount: 1,
};
