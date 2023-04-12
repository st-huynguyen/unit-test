export const isAscendingNumbersArray = (arr: number[]) => {
  const { length } = arr;

  if (!length) {
    return false;
  }

  if (length === 1) {
    return true;
  }

  const lastIndex = length - 1;
  for (let i = 0; i < lastIndex; i++) {
    if (arr[i] > arr[i + 1]) {
      return false;
    }
  }

  return true;
};
