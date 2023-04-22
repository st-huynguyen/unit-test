# Testing library

## Requirements

Tạo một App đơn giản gồm những chức năng sau đây và viết Unit Test:

- Hiển thị list user
- Xoá user ra khỏi list
- Click vào user thì hiện thông tin chi tiết ở trang detail

Phía dưới là các API dùng cho bài tập

```
https://jsonplaceholder.typicode.com/users
https://jsonplaceholder.typicode.com/users/:id
```

Yêu cầu: dùng redux, router (test app với tất cả các trường hợp xảy ra khi request api: loading, fail, success…).

## Testcases

### `App.test.tsx`

#### Test 1:

- Input: User enter root index (/)
- Output: Render List page

#### Test 2:

- Input: User click on user detail link
- Output: Render Detail page

#### Test 3:

- Input: User enter some url not in app route
- Output: Render Not found page

### `Error.test.tsx`

- Input: Call Error component with props
- Output: Render Error component with props

### `Loading.test.tsx`

- Input: Call Loading component with props
- Output: Render Loading component with props

### `List.test.tsx`

#### Test 1:

- Input: User go to /
- Output: Render List page title

#### Test 2:

- Input: User go to /
- Output: Render loading state

#### Test 3:

- Input: User go to / and make api call success
- Output: Render list users

#### Test 4:

- Input: User go to / and make api call fail
- Output: Render error state

#### Test 5:

- Input: User click on delete user 2 and make api call success
- Output: Render list users without deleted user

#### Test 6:

- Input: User click on delete user 2 and make api call fail
- Output: Render original list users and error state

### `Detail.test.tsx`

#### Test 1:

- Input: User go to /users/1
- Output: Render Detail page title

#### Test 2:

- Input: User go to /users/1
- Output: Render loading state

#### Test 3:

- Input: User go to /users/1 and make api call success
- Output: Render user 1 info

#### Test 4:

- Input: User go to /users/1 and make api call fail with 500 error
- Output: Render error state

#### Test 5:

- Input: User go to /users/1 and make api call fail with 404 error
- Output: Render user not found error state

### `NotFound.test.tsx`

- Input: Call Not found component
- Output: Render Not found page
