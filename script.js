'use strict';

//Select Element
const score0EL = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const currentScore0EL = document.querySelector('#current--0');
const currentScore1EL = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player1El = document.querySelector('.player--0');
const player2El = document.querySelector('.player--1');
//start condition

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  player1El.classList.toggle('player--active');
  player2El.classList.toggle('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
};

let scores, currentScore, activePlayer, playing;

const init = function () {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;

  score0EL.textContent = 0;
  score1El.textContent = 0;
  currentScore0EL.textContent = 0;
  currentScore1EL.textContent = 0;

  diceEl.classList.add('hidden');
  player1El.classList.remove('player--winner');
  player2El.classList.remove('player--winner');
  player1El.classList.add('player--active');
  player2El.classList.remove('player--active');
};
init();
//roll dice
btnRoll.addEventListener('click', function () {
  //1. Generate random dice
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //3. Check dice is 1?
    if (dice !== 1) {
      //add current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. add current score to score;
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. check score > 100 => win game => fish game
    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      playing = false;
    } else {
      //3. switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
