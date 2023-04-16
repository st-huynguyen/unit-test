import AuthenService from './authen.service';
import { AuthStorageService } from './authStorage.service';

// Automatic mock
jest.mock('./authStorage.service');

describe('Test authen service', () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods
    AuthStorageService.mockClear();
  });

  it('Check if authenService called the authStorageService class constructor', () => {
    const authenService = new AuthenService();
    expect(AuthStorageService).toHaveBeenCalledTimes(1);
  });

  it('Check if the authenService called get token method on the authStorageService class instance', () => {
    const authenService = new AuthenService();
    const mockAuthStorageServiceInstance = AuthStorageService.mock.instances[0];
    const mockGetToken = mockAuthStorageServiceInstance.getToken;
    mockGetToken.mockReturnValue('returned-token');
    authenService.setAuthenHeader();
    expect(mockGetToken).toHaveBeenCalledTimes(1);
    expect(mockGetToken.mock.results[0].value).toBe('returned-token');
  });

  it('Check if the authenService called set token method on the authStorageService class instance', () => {
    const authenService = new AuthenService();
    const mockAuthStorageServiceInstance = AuthStorageService.mock.instances[0];
    const mockSetToken = mockAuthStorageServiceInstance.setToken;
    const newToken = 'new-token';
    authenService.setNewToken(newToken);
    expect(mockSetToken).toHaveBeenCalledWith(newToken);
    expect(mockSetToken).toHaveBeenCalledTimes(1);
  });

  it('Check if the authenService called remove token method on the authStorageService class instance', () => {
    const authenService = new AuthenService();
    const mockAuthStorageServiceInstance = AuthStorageService.mock.instances[0];
    const mockRemoveToken = mockAuthStorageServiceInstance.removeToken;
    authenService.logOut();
    expect(mockRemoveToken).toHaveBeenCalledTimes(1);
  });
});
