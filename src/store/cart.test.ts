import { describe, expect, it } from '@jest/globals';
import { Cart } from './cart';
import { Fruit, fruits } from './fruit';

describe('Test cart', () => {
  const cart = new Cart();
  const apple = new Fruit(fruits.apple);
  const orange = new Fruit(fruits.orange);

  beforeEach(() => {
    cart.clearCart();
  });

  describe('Test addItem method', () => {
    it('Add 1 apple to cart => Cart contain 1 apple', () => {
      cart.addItem(apple, 1);
      expect(cart.cartItems[0].amount).toBe(1);
      expect(cart.cartItems[0].name).toBe('apple');
    });
    it('Add 2 apples to cart => Cart contain 2 apples', () => {
      cart.addItem(apple, 2);
      expect(cart.cartItems[0].amount).toBe(2);
      expect(cart.cartItems[0].name).toBe('apple');
      expect(cart.cartItems.length).toBe(1);
    });
  });

  describe('Test removeItem method', () => {
    it('Add 2 apples and remove 1 apple => Cart contain 1 apple', () => {
      cart.addItem(apple, 2);
      cart.removeItem(apple, 1);
      expect(cart.cartItems[0].amount).toBe(1);
    });
    it('Add 5 apples and remove 2 apple => Cart contain 3 apple', () => {
      cart.addItem(apple, 5);
      cart.removeItem(apple, 2);
      expect(cart.cartItems[0].amount).toBe(3);
    });
    it('Add 1 apple and remove 1 apple => Cart not contain apple', () => {
      cart.addItem(apple, 1);
      cart.removeItem(apple, 1);
      expect(cart.cartItems.length).toBe(0);
    });
    it('Remove 2 apples => Cart not contain apple', () => {
      cart.removeItem(apple, 2);
      expect(cart.cartItems.length).toBe(0);
    });
    it('Add 4 apples + 3 oranges and remove 2 orange => Cart not 4 apples + 1 orange', () => {
      cart.addItem(apple, 4);
      cart.addItem(orange, 3);
      cart.removeItem(orange, 2);
      expect(cart.cartItems.length).toBe(2);
      expect(cart.cartItems[0].amount).toBe(4);
      expect(cart.cartItems[0].name).toBe('apple');
      expect(cart.cartItems[1].amount).toBe(1);
      expect(cart.cartItems[1].name).toBe('orange');
    });
  });

  describe('Test calculateCost method', () => {
    it('Cart has no item', () => {
      expect(cart.totalCost).toBe(0);
    });

    it('Calculate cost 1 apple', () => {
      cart.addItem(apple, 1);
      const appleCost =
        (apple.price * (100 - apple.discount[0].discount)) / 100;
      expect(cart.totalCost).toBe(appleCost);
    });
    it('Calculate cost 2 apples', () => {
      cart.addItem(apple, 2);
      const appleCost =
        (2 * apple.price * (100 - apple.discount[1].discount)) / 100;
      expect(cart.totalCost).toBe(appleCost);
    });
    it('Calculate cost 5 apples', () => {
      cart.addItem(apple, 5);
      const appleCost =
        (5 * apple.price * (100 - apple.discount[1].discount)) / 100;
      expect(cart.totalCost).toBe(appleCost);
    });

    it('Calculate cost 1 apple + 1 orange', () => {
      cart.addItem(apple, 1);
      cart.addItem(orange, 1);
      const appleCost =
        (apple.price * (100 - apple.discount[0].discount)) / 100;
      const orangeCost = orange.price;
      const total = appleCost + orangeCost;
      expect(cart.totalCost).toBe(total);
    });
    it('Calculate cost 1 apple + 2 oranges', () => {
      cart.addItem(apple, 1);
      cart.addItem(orange, 2);
      const appleCost =
        (apple.price * (100 - apple.discount[0].discount)) / 100;
      const orangeCost =
        (2 * orange.price * (100 - orange.discount[0].discount)) / 100;
      const total = appleCost + orangeCost;
      expect(cart.totalCost).toBe(total);
    });
    it('Calculate cost 3 apples + 2 oranges', () => {
      cart.addItem(apple, 3);
      cart.addItem(orange, 2);
      const appleCost =
        (3 * apple.price * (100 - apple.discount[1].discount)) / 100;
      const orangeCost =
        (2 * orange.price * (100 - orange.discount[0].discount)) / 100;
      const total = appleCost + orangeCost;
      expect(cart.totalCost).toBe(total);
    });
    it('Calculate cost 3 apples + 5 oranges', () => {
      cart.addItem(apple, 3);
      cart.addItem(orange, 5);
      const appleCost =
        (3 * apple.price * (100 - apple.discount[1].discount)) / 100;
      const orangeCost =
        (5 * orange.price * (100 - orange.discount[1].discount)) / 100;
      const total = appleCost + orangeCost;
      expect(cart.totalCost).toBe(total);
    });
    it('Calculate cost 10 apples + 15 oranges', () => {
      cart.addItem(apple, 10);
      cart.addItem(orange, 15);
      const appleCost =
        (10 * apple.price * (100 - apple.discount[1].discount)) / 100;
      const orangeCost =
        (15 * orange.price * (100 - orange.discount[1].discount)) / 100;
      const total = appleCost + orangeCost;
      expect(cart.totalCost).toBe(total);
    });
  });
});
