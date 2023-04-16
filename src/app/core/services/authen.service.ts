import { AuthStorage, AuthStorageService } from './authStorage.service';

export default class AuthenService {
  storage: AuthStorage;
  authenHeader: string;
  isNewToken: boolean;
  isLogin: boolean;

  constructor() {
    this.storage = new AuthStorageService();
  }

  setAuthenHeader() {
    const token = this.storage.getToken();
    this.authenHeader = `Authorization: Bearer ${token}`;
    // Do something
  }

  setNewToken(newToken: string) {
    this.storage.setToken(newToken);
    this.isNewToken = true;
    // Do something
  }

  logOut() {
    this.storage.removeToken();
    this.isLogin = false;
    // Do something
  }
}
