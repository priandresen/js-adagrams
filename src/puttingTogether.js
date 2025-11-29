import { drawLetters, usesAvailableLetters, scoreWord, highestScoreFrom } from './adagrams.js';

const state = {round : 1,
  score : 0,
  letters : [],
  words : [],
  bestWord : '',
  bestScore : 0,
};

const resetGame = () => {
    state.round = 1;
    state.letters = [];
    state.words = [];
    state.bestWord = '';
    state.bestScore = 0;
    state.score = 0;
    updateScore();
    bestWord.textContent = '';
};

const startRound = () => {
    resetGame();
    drawPile();
};

const drawButton = document.getElementById('draw-button');

const drawPile = () => {
  const letters = drawLetters();
  for (let i = 0; i < 10; i++) {
    const tile = document.getElementById(`tile${i + 1}`);
    tile.textContent = letters[i];
  }
  state.letters = letters;
};

drawButton.addEventListener('click', drawPile);

const entryContainer = document.getElementById('word-input');
const entryContainerText = (event) => {
  const entry = event.target.value;
  return entry;
};

entryContainer.addEventListener('input', entryContainerText);

const submitButton = document.getElementById('submit-word-button');

submitButton.addEventListener('click', () => {
    const isValid = usesAvailableLetters(entryContainer.value, state.letters);
    const score = scoreWord(entryContainer.value);
    if (isValid && (entryContainer.value.length > 0)){
        resultContainer.textContent = `Score: ${score}`;
        state.score += score;
        state.words.push(entryContainer.value);
        updateScore();
        updateBestWord(state.words, score);
        state.round += 1;
    } else {
        resultContainer.textContent = 'Invalid word!';
    }
    if (state.round === 6) {
        alert(`Game over! Your total score is ${state.score} points. The best word you played was "${state.bestWord}" for ${state.bestScore} points.`);
        startRound();
    }
});

const resultContainer = document.getElementById('result-container');

const updateScore = () => {
    resultContainer.textContent = `Score: ${state.score}`;
};

const bestWord = document.getElementById('best-word-result');
const updateBestWord = (words) => {
    const best = highestScoreFrom(words);
    bestWord.textContent = `The best word is "${best.word}" with a score of ${best.score} points!`;
    state.bestWord = best.word;
    state.bestScore = best.score;
};





