import { isAscendingNumbersArray } from './util';
import { describe, expect, it } from '@jest/globals';

describe('Check if the input array is an ascending sorted numbers', () => {
  describe('The input is not an array', () => {
    it('String value may be return false', () => {
      expect(isAscendingNumbersArray('hello')).toBe(false);
    });
    it('Number value may be return false', () => {
      expect(isAscendingNumbersArray(69)).toBe(false);
    });
    it('Boolean value may be return false', () => {
      expect(isAscendingNumbersArray(true)).toBe(false);
    });
    it('Undefined value may be return false', () => {
      expect(isAscendingNumbersArray(undefined)).toBe(false);
    });
  });
  describe('The input is not a numbers array', () => {
    it('Empty array may be return false', () => {
      expect(isAscendingNumbersArray([])).toBe(false);
    });
    it('String array may be return false', () => {
      expect(isAscendingNumbersArray(['hello', 'world'])).toBe(false);
    });
    it('Boolean array may be return false', () => {
      expect(isAscendingNumbersArray([true, false])).toBe(false);
    });
    it('Random value array may be return false', () => {
      expect(isAscendingNumbersArray([undefined, 'hello', 12, 69])).toBe(false);
    });
  });
  describe('The input is a numbers array', () => {
    it('Array has 1 number may be return false', () => {
      expect(isAscendingNumbersArray([1])).toBe(false);
    });
    it('Random numbers array may be return false', () => {
      expect(isAscendingNumbersArray([3, 4, 9, 0, 2])).toBe(false);
    });
    it('Decreased array may be return false', () => {
      expect(isAscendingNumbersArray([4, 2, 1, -2])).toBe(false);
    });
    it('Increased array may be return true', () => {
      expect(isAscendingNumbersArray([1, 2, 3, 3.2])).toBe(true);
    });
    it('Increased array has same value may be return true', () => {
      expect(isAscendingNumbersArray([2, 4, 4, 5.5])).toBe(true);
    });
    it('Same numbers array may be return true', () => {
      expect(isAscendingNumbersArray([3, 3, 3, 3])).toBe(true);
    });
  });
});
