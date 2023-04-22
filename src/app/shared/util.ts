export const isAscendingNumbersArray = (arr: any) => {
  if (
    !Array.isArray(arr) ||
    arr.some((item) => typeof item !== 'number') ||
    arr.length <= 1
  ) {
    return false;
  }

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      return false;
    }
  }

  return true;
};
