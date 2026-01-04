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
const LETTER_POOL_POINTS = {
  A: 1,
  B: 3,
  C: 3,
  D: 2,
  E: 1,
  F: 4,
  G: 2,
  H: 4,
  I: 1,
  J: 8,
  K: 5,
  L: 1,
  M: 3,
  N: 1,
  O: 1,
  P: 3,
  Q: 10,
  R: 1,
  S: 1,
  T: 1,
  U: 1,
  V: 4,
  W: 4,
  X: 8,
  Y: 4,
  Z: 10
};
const HAND_SIZE = 10;
const BONUS_MIN_LENGTH = 7;
const LENGTH_BONUS_POINTS = 8;

export const createLetterPoolArray = () => {
  const letterPoolList = [];

  for (const [tile, numAvailable] of Object.entries(LETTER_POOL)){
    for (let i = 0; i < numAvailable; i++){
      letterPoolList.push(tile);
    }
  }
  return letterPoolList;
};

export const drawLetters = () => {
  const hand = [];
  const letterPoolList = createLetterPoolArray();

  while (hand.length != HAND_SIZE){
    let letterIndex = Math.floor(Math.random() * letterPoolList.length);
    hand.push(letterPoolList[letterIndex]);
    letterPoolList[letterIndex] = letterPoolList[letterPoolList.length - 1];
    letterPoolList.pop();
  }

  return hand;
};

export const createFrequencyObject = (array) => {
  const frequencyObj = {};
  for (const element of array){
    const current = frequencyObj[element] || 0;
    frequencyObj[element] = current + 1;
  }
  return frequencyObj;
};

export const usesAvailableLetters = (input, lettersInHand) => {
  const upperWord = input.toUpperCase();

  const handLetterFrequency = createFrequencyObject(lettersInHand);
  const wordLetterFrequency = createFrequencyObject(upperWord);

  for (const letter in wordLetterFrequency){
    if (wordLetterFrequency[letter] > (handLetterFrequency[letter] || 0)){
      return false;
    }
  }
  return true;
};

export const scoreWord = (word) => {
  let score = 0;
  const upperWord = word.toUpperCase();

  if (upperWord.length === 0){
    return score;
  } else if (upperWord.length >= BONUS_MIN_LENGTH){
    score += LENGTH_BONUS_POINTS;
  }

  for (const letter in upperWord){
    score += LETTER_POOL_POINTS[upperWord[letter]];
  }
  return score;
};

export const highestScoreFrom = (words) => {

  const getScoreMap = words.map((word) => ({word, score: scoreWord(word)}));

  const scores = getScoreMap;

  const maxScore = Math.max(...scores.map((entry) => entry.score));

  const topScoringWords = scores.filter((entry) => entry.score === maxScore).map((entry) => entry.word);

  if (topScoringWords.length === 1){
    return { word: topScoringWords[0], score: maxScore };
  } else {
    if (topScoringWords.filter((word => word.length === 10)).length > 0){
      return { word: topScoringWords.find((word) => word.length === 10), score: maxScore };
    } else {
      let shortestWord = topScoringWords[0];
      for (const word of topScoringWords){
        if (word.length < shortestWord.length){
          shortestWord = word;
        }
      }
      return { word: shortestWord, score: maxScore };
    }
  }
};