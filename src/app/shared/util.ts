export const isAscendingNumbersArray = (arr: any) => {
  if (
    !Array.isArray(arr) ||
    arr.length <= 1 ||
    typeof arr[arr.length - 1] !== 'number'
  ) {
    return false;
  }

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > arr[i + 1] || typeof arr[i] !== 'number') {
      return false;
    }
  }

  return true;
};
