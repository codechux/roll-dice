"use strict";

// selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const diceEl = document.querySelector(".dice");
const rollDiceEl = document.querySelector(".btn--roll");
const currentScore0El = document.querySelector("#current--0");
const currentScore1El = document.querySelector("#current--1");
const btnHold = document.querySelector(".btn--hold");
const btnReset = document.querySelector(".btn--new");

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add("hidden");
currentScore0El.textContent = 0;
currentScore1El.textContent = 0;

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let isPlaying = true;

const switchP = () => {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// rolling the dice
rollDiceEl.addEventListener("click", function () {
  if (isPlaying) {
    let dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove("hidden");
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchP();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (isPlaying) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 10) {
      isPlaying = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      btnHold.classList.add("cursor");
      rollDiceEl.classList.add("cursor");
    } else {
      switchP();
    }
  }
});

btnReset.addEventListener("click", function () {
  //   isPlaying = true;
  diceEl.classList.add("hidden");
  currentScore = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  btnHold.classList.remove("cursor");
  rollDiceEl.classList.remove("cursor");
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--active");
});
