export const isAscendingNumbersArray = (arr: number[]) => {
  const { length } = arr;

  if (!length) {
    return false;
  }

  if (length === 1) {
    return true;
  }

  for (let i = 0; i < length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      return false;
    }
  }

  return true;
};
