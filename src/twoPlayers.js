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

