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

  addItem(item: Fruit, amount: number) {
    const existedItem = this.cartItems.findIndex(
      (fruit) => fruit.name === item.name
    );

    if (existedItem !== -1) {
      this.cartItems[existedItem].amount += amount;
    } else {
      this.cartItems.push({ ...item, amount });
    }
    this.calculateCost();
  }

  removeItem(item: Fruit, amount: number) {
    const existedItem = this.cartItems.findIndex(
      (fruit) => fruit.name === item.name
    );
    if (existedItem !== -1) {
      const currentAmount = this.cartItems[existedItem].amount;
      if (currentAmount === amount) {
        this.cartItems.splice(existedItem, 1);
      } else if (currentAmount > amount) {
        this.cartItems[existedItem].amount -= amount;
      }
    }
    this.calculateCost();
  }

  calculateCost() {
    const getDiscount = (fruit: Fruit) => {
      for (let i = fruit.discount.length - 1; i >= 0; i--) {
        const d = fruit.discount[i];
        if (fruit.amount >= d.appliedAmount) {
          return d.discount;
        }
      }
      return 0;
    };

    const totalCost = this.cartItems.reduce(
      (total, fruit) =>
        total + (fruit.amount * fruit.price * (100 - getDiscount(fruit))) / 100,
      0
    );

    this.totalCost = totalCost;
    return totalCost;
  }

  clearCart() {
    this.cartItems = [];
    this.totalCost = 0;
  }
}
