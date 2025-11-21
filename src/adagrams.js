const LETTER_POOL = {
  A: 9,
  B: 2,
  C: 2,
  D: 4,
  E: 12,
  F: 2,
  G: 3,
  H: 2,
  I: 9,
  J: 1,
  K: 1,
  L: 4,
  M: 2,
  N: 6,
  O: 8,
  P: 2,
  Q: 1,
  R: 6,
  S: 4,
  T: 6,
  U: 4,
  V: 2,
  W: 2,
  X: 1,
  Y: 2,
  Z: 1
};

const HAND_SIZE = 10;

export const drawLetters = () => {
  const hand = [];
  const letterPoolList = [];

  for (const [tile, numAvailable] of Object.entries(LETTER_POOL)){
    for (let i = 0; i < numAvailable; i++){
      letterPoolList.push(tile);
    }
  }

  while (hand.length != HAND_SIZE){
    let letterIndex = Math.floor(Math.random() * letterPoolList.length);
    hand.push(letterPoolList[letterIndex]);
    letterPoolList[letterIndex] = letterPoolList[letterPoolList.length - 1];
    letterPoolList.pop();
  }

  return hand;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  const word = input.ToUpperCase();

  const lettersInHandObject = lettersInHand.fromEntries(lettersInHand.map(lettersInHand => [letter, 0]));






};

export const scoreWord = (word) => {
  // Implement this method for wave 3
};

export const highestScoreFrom = (words) => {
  // Implement this method for wave 4
};
