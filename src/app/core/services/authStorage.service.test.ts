import { AuthStorageService } from './authStorage.service';

const authStorageService = new AuthStorageService();
const key = authStorageService.ACCESS_TOKEN; // 'token'
const value = 'some-jwt-token';

describe('Test AuthStorageService', () => {
  it('Test setToken method', () => {
    jest.spyOn(Storage.prototype, 'setItem');
    authStorageService.setToken(value);
    expect(localStorage.setItem).toBeCalledTimes(1);
    expect(localStorage.setItem).toBeCalledWith(key, value);
  });

  it('Test getToken method', () => {
    jest.spyOn(Storage.prototype, 'getItem');
    authStorageService.getToken();
    expect(localStorage.getItem).toBeCalledTimes(1);
    expect(localStorage.getItem).toBeCalledWith(key);
  });

  it('Test removeToken method', () => {
    jest.spyOn(Storage.prototype, 'removeItem');
    authStorageService.removeToken();
    expect(localStorage.removeItem).toBeCalledTimes(1);
    expect(localStorage.removeItem).toBeCalledWith(key);
  });
});
