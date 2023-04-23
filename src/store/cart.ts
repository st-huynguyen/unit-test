import { DiscountInterface, Fruit } from './fruit';

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

  getItem(fruit: Fruit) {
    return this.cartItems.find((item) => item.name === fruit.name);
  }

  addItem(item: Fruit, amount: number) {
    const existedItem = this.getItem(item);
    if (existedItem) {
      existedItem.amount += amount;
    } else {
      const newItem = { ...item, amount };
      newItem.discount = this.sortDiscount(item.discount);
      this.cartItems.push(newItem);
    }
    this.calculateCost();
  }

  removeItem(item: Fruit, amount: number) {
    const existedItem = this.getItem(item);
    if (existedItem) {
      const currentAmount = existedItem.amount;
      if (currentAmount === amount) {
        const updatedCart = this.cartItems.filter(
          (item) => item.name !== existedItem.name
        );
        this.cartItems = updatedCart;
      } else if (currentAmount > amount) {
        existedItem.amount -= amount;
      }
    }
    this.calculateCost();
  }

  sortDiscount(discount: DiscountInterface[]) {
    const newDiscount = [...discount];
    return newDiscount.sort((a, b) => a.appliedAmount - b.appliedAmount);
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
