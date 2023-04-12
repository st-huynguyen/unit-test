1. Hãy nêu các bước viết unit test

- Identify all possible case

- Specify parameters and expected results for each case

- Write test

- Execute test

- Evaluation and assessment of results

2. Hãy nêu các thành phần cơ bản có trong 1 unit test

- Test suit

- Block test

- Test case

- Action

- Assert

3. Liệt kê tất cả các test cases mà bạn có thể nghĩ ra để kiểm tra 1 mảng có phải là mảng số tăng dần hay không.

| Input                        | Output |
| ---------------------------- | ------ |
| 'hello'                      | False  |
| 69                           | False  |
| true                         | False  |
| undefined                    | False  |
| []                           | False  |
| ['hello', 'world']           | False  |
| [true, false]                | False  |
| [undefined, 'hello', 12, 69] | False  |
| [1]                          | False  |
| [3, 4, 9, 0, 2]              | False  |
| [4, 2, 1, -2]                | False  |
| [1, 2, 3, 3.2]               | True   |
| [2, 4, 4, 5.5]               | True   |
| [3, 3, 3, 3]                 | True   |
