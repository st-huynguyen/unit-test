## Test cases

### Exercise 2: AuthStorageService

Viết Unit Test cho class AuthStorageService ở authStorage.sevice.ts (kiểm tra localStorage có được gọi và arguments truyền vào có như kỳ vọng hay không)(mock localStorage)

#### Test 1:

- Input: Mock setToken method
- Output: `localStorage.setToken` was called with correct key and value

#### Test 2:

- Input: Mock getToken method
- Output: `localStorage.getToken` was called with correct key and return correct token

#### Test 3:

- Input: Mock removeToken method
- Output: `localStorage.removeToken` was called with correct key and return undefined token

### Exercise 3: AuthenService

Tạo một class bất kì, bên trong có sử dụng method các method của AuthStorageService, viết Unitest cho class vừa tạo(kiểm tra các method của AuthStorageService có được gọi và arguments truyền vào có như kỳ vọng hay không)(mock AuthStorageService)

#### Test 1:

- Input: Mock setToken method
- Output: `AuthStorageService.setToken` was called with correct key and value

#### Test 2:

- Input: Mock getToken method
- Output: `AuthStorageService.getToken` was called with correct key

#### Test 3:

- Input: Mock removeToken method
- Output: `AuthStorageService.removeToken` was called with correct key
