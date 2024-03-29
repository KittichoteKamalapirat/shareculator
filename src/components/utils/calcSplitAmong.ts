import { Expense } from "../interface";

export const calcSplitAmong = (inputs: Expense[], index: number) => {
  const splitAmongs = inputs[index].splitAmong;
  const splitNum = inputs[index].splitAmong.filter(
    (bool) => bool === true
  ).length;

  const burderEach = inputs[index].amount / splitNum;

  //handle calculation
  splitAmongs.forEach((bool, includedIndex) => {
    inputs[index].detail[includedIndex] = bool ? burderEach : 0;
  });

  const inputSum = inputs[index].detail.reduce((a, b) => a + b);
  const amount = parseInt(inputs[index].amount as any); //amount is string
  if (inputSum !== amount) {
    inputs[index].isInvalid = true;
  } else {
    inputs[index].isInvalid = false;
  }

  return inputs;
};
