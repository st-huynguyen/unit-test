export const isAscendingNumbersArray = (arr: any) => {
  if (!Array.isArray(arr) || !isOnlyNumbers(arr) || arr.length <= 1) {
    return false;
  }

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      return false;
    }
  }

  return true;
};

const isOnlyNumbers = (arr: any) => {
  return arr.every((element: any) => {
    return typeof element === 'number';
  });
};
