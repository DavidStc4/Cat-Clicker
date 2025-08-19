
import { state } from './data.js';
import { checkAchievements } from './achievements.js';
import { renderCatShop } from './cats.js';
import { clickSound, soundOn } from './script.js';
import { checkBuffUnlock } from './buffsUnlock.js';
import { saveState } from './storage.js';

let saveTimer;

export const incrementCat = (showAnimation = true) => {
  state.clickCount += state.currentCat.clickValue;
  updateClickDisplay();
  checkBuffUnlock();
  checkAchievements(state.clickCount);

  if (soundOn) { clickSound.currentTime = 0; clickSound.play(); }
  if (showAnimation) createPlusOne();
  renderCatShop();

  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => saveState(), 300);
};

export const updateClickDisplay = () => {
  document.querySelector('.cat-cost').innerText = state.clickCount;
};

export const createPlusOne = () => {
  const plusOne = document.createElement('div');
  plusOne.innerText = `+${state.currentCat.clickValue}`;
  plusOne.classList.add('plus-one');
  document.body.appendChild(plusOne);
  const x = Math.random() * window.innerWidth * 0.8;
  const y = Math.random() * window.innerHeight * 0.8;
  plusOne.style.left = `${x}px`;
  plusOne.style.top = `${y}px`;
  setTimeout(() => plusOne.remove(), 1000);
};
