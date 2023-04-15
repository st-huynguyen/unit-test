import { describe, expect, it } from '@jest/globals';
import { Cart } from './cart';
import { APPLE, GRAPE, ORANGE } from './fruit';

describe('Test cart', () => {
  const cart = new Cart();
  beforeEach(() => {
    cart.clearCart();
  });

  describe('Test addItem method', () => {
    it('Add 1 apple to cart => Cart contain 1 apple', () => {
      cart.addItem(APPLE);
      expect(cart.cartItems).toContainEqual(APPLE);
    });
    it('Add 2 apples to cart => Cart contain 2 apples', () => {
      cart.addItem(APPLE);
      cart.addItem(APPLE);
      expect(cart.cartItems[0].amount).toBe(2);
    });
  });

  describe('Test removeItem method', () => {
    it('Add 2 apples and remove 1 apple => Cart contain 1 apple', () => {
      cart.addItem(APPLE);
      cart.addItem(APPLE);
      cart.removeItem(APPLE);
      expect(cart.cartItems).toContainEqual(APPLE);
    });
    it('Add 3 apples and remove 1 apple => Cart contain 2 apple', () => {
      cart.addItem(APPLE);
      cart.addItem(APPLE);
      cart.addItem(APPLE);
      cart.removeItem(APPLE);
      expect(cart.cartItems[0].amount).toBe(2);
    });
    it('Add 1 orange and remove 1 orange => Cart not contain orange', () => {
      cart.addItem(ORANGE);
      cart.removeItem(ORANGE);
      expect(cart.cartItems).not.toContainEqual(ORANGE);
    });
    it('Remove 1 grape => Cart not contain grape', () => {
      cart.removeItem(GRAPE);
      expect(cart.cartItems).not.toContainEqual(GRAPE);
    });
  });

  describe('Test calculateCost method', () => {
    it('Calculate cost 1 apple', () => {
      cart.addItem(APPLE);
      const appleCost = (1 * APPLE.price * (100 - APPLE.discount1)) / 100;
      expect(cart.totalCost).toBe(appleCost);
    });
    it('Calculate cost 2 apples', () => {
      const appleAmount = 2;
      for (let i = 0; i < appleAmount; i++) {
        cart.addItem(APPLE);
      }
      const appleCost =
        (appleAmount * APPLE.price * (100 - APPLE.discount2)) / 100;
      expect(cart.totalCost).toBe(appleCost);
    });
    it('Calculate cost 5 apples', () => {
      const appleAmount = 5;
      for (let i = 0; i < appleAmount; i++) {
        cart.addItem(APPLE);
      }
      const appleCost =
        (appleAmount * APPLE.price * (100 - APPLE.discount2)) / 100;
      expect(cart.totalCost).toBe(appleCost);
    });
    it('Calculate cost 1 apple + 1 orange', () => {
      cart.addItem(APPLE);
      cart.addItem(ORANGE);
      const appleCost = (1 * APPLE.price * (100 - APPLE.discount1)) / 100;
      const orangeCost = (1 * ORANGE.price * (100 - ORANGE.discount1)) / 100;
      const total = appleCost + orangeCost;
      expect(cart.totalCost).toBe(total);
    });
    it('Calculate cost 1 apple + 2 oranges', () => {
      cart.addItem(APPLE);
      const appleCost = (1 * APPLE.price * (100 - APPLE.discount1)) / 100;

      const orangeAmount = 2;
      for (let i = 0; i < orangeAmount; i++) {
        cart.addItem(ORANGE);
      }
      const orangeCost =
        (orangeAmount * ORANGE.price * (100 - ORANGE.discount2)) / 100;
      const total = appleCost + orangeCost;
      expect(cart.totalCost).toBe(total);
    });
    it('Calculate cost 3 apples + 4 oranges', () => {
      const appleAmount = 3;
      for (let i = 0; i < appleAmount; i++) {
        cart.addItem(APPLE);
      }
      const appleCost =
        (appleAmount * APPLE.price * (100 - APPLE.discount2)) / 100;

      const orangeAmount = 4;
      for (let i = 0; i < orangeAmount; i++) {
        cart.addItem(ORANGE);
      }
      const orangeCost =
        (orangeAmount * ORANGE.price * (100 - ORANGE.discount2)) / 100;

      const total = appleCost + orangeCost;
      expect(cart.totalCost).toBe(total);
    });
  });
});
