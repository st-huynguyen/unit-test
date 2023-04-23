export interface DiscountInterface {
  discount: number;
  appliedAmount: number;
}

export interface FruitInterface {
  name: string;
  price: number;
  amount: number;
  discount: DiscountInterface[];
}

export class Fruit implements FruitInterface {
  name: string;
  price: number;
  amount: number;
  discount: DiscountInterface[];

  constructor(fruit: Fruit) {
    this.name = fruit.name;
    this.price = fruit.price;
    this.amount = fruit.amount;
    this.discount = fruit.discount;
  }
}

export const fruits = {
  apple: {
    name: 'apple',
    price: 10000,
    amount: 1,
    discount: [
      {
        discount: 5,
        appliedAmount: 1,
      },
      {
        discount: 10,
        appliedAmount: 2,
      },
    ],
  },
  orange: {
    name: 'orange',
    price: 20000,
    amount: 1,
    discount: [
      {
        discount: 10,
        appliedAmount: 2,
      },
      {
        discount: 20,
        appliedAmount: 5,
      },
    ],
  },
};
