import { Expense } from "../interface";

export const toggleSplitAmong = (
  inputArray: Expense[],
  index: number,
  subIndex: number
) => {
  //   const inputs = [...inputArray];
  const isIncluded = inputArray[index].splitAmong[subIndex];

  inputArray[index].splitAmong[subIndex] = !isIncluded;
  return inputArray;
};
