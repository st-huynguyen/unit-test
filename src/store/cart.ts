import { Fruit } from './fruit';

interface CartInterface {
  cartItems: Fruit[];
  totalCost: number;
}

export class Cart implements CartInterface {
  cartItems: Fruit[];
  totalCost: number;

  constructor() {
    this.cartItems = [];
    this.totalCost = 0;
  }

  addItem(item: Fruit) {
    const existedItem = this.cartItems.findIndex(
      (fruit) => fruit.name === item.name
    );
    if (existedItem !== -1) {
      this.cartItems[existedItem].amount++;
    } else {
      this.cartItems.push({ ...item });
    }
    this.calculateCost();
  }

  removeItem(item: Fruit) {
    const existedItem = this.cartItems.findIndex(
      (fruit) => fruit.name === item.name
    );
    if (existedItem !== -1) {
      if (this.cartItems[existedItem].amount === 1) {
        this.cartItems.splice(existedItem, 1);
      } else {
        this.cartItems[existedItem].amount--;
      }
    }
    this.calculateCost();
  }

  clearCart() {
    this.cartItems = [];
    this.totalCost = 0;
  }

  calculateCost() {
    const getDiscount = (fruit: Fruit) =>
      fruit.amount >= 2 ? fruit.discount2 : fruit.discount1;

    const totalCost = this.cartItems.reduce(
      (total, fruit) =>
        total + (fruit.amount * fruit.price * (100 - getDiscount(fruit))) / 100,
      0
    );

    this.totalCost = totalCost;
    return totalCost;
  }
}
