import AuthenService from './authen.service';
import { AuthStorageService } from './authStorage.service';

const authenService = new AuthenService();
const value = 'new-token';

describe('Test AuthenService', () => {
  it('Test set token method', () => {
    const mockSetToken = jest.spyOn(AuthStorageService.prototype, 'setToken');
    authenService.setNewToken(value);
    expect(mockSetToken).toBeCalledTimes(1);
    expect(mockSetToken).toBeCalledWith(value);
  });

  it('Test get token method', () => {
    const mockGetToken = jest.spyOn(AuthStorageService.prototype, 'getToken');
    authenService.setAuthenHeader();
    expect(mockGetToken).toBeCalledTimes(1);
    expect(mockGetToken).toBeCalledWith();
  });

  it('Test remove token method', () => {
    const mockRemoveToken = jest.spyOn(
      AuthStorageService.prototype,
      'removeToken'
    );
    authenService.logOut();
    expect(mockRemoveToken).toBeCalledTimes(1);
    expect(mockRemoveToken).toBeCalledWith();
  });
});
