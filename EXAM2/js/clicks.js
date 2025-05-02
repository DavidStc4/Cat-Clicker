import { state } from './data.js';
import { checkAchievements } from './achievements.js';
import { renderCatShop } from './cats.js';
import { clickSound, soundOn } from './script.js';

export function incrementCat(showAnimation = true) {
    state.clickCount += state.currentCat.clickValue;
    updateClickDisplay();
    checkBuffUnlock();
    checkAchievements(state.clickCount);
  
    if (soundOn) {
      clickSound.currentTime = 0;
      clickSound.play();
    }
  
    if (showAnimation) createPlusOne();
    renderCatShop();
  }

export function updateClickDisplay() {
  document.querySelector('.cat-cost').innerText = state.clickCount;
}

export function checkBuffUnlock() {
    const secClicker = document.querySelector('.auto-clicker');
    const buffDot = document.getElementById('buffDot');
  
    if (!secClicker || !buffDot) return; 
  
    if (state.clickCount >= 10 && !secClicker.classList.contains('unlocked')) {
      secClicker.classList.add('unlocked');
      secClicker.innerText = 'Unlock: Auto Click Cost 10';
    }
  
    if (
      state.clickCount >= 10 &&
      secClicker.classList.contains('unlocked') &&
      !secClicker.classList.contains('active')
    ) {
      buffDot.classList.remove('hidden');
    } else {
      buffDot.classList.add('hidden');
    }
  }

export function createPlusOne() {
  const plusOne = document.createElement('div');
  plusOne.innerText = `+${state.currentCat.clickValue}`;
  plusOne.classList.add('plus-one');
  document.body.appendChild(plusOne);

  const x = Math.random() * window.innerWidth * 0.8;
  const y = Math.random() * window.innerHeight * 0.8;
  plusOne.style.left = `${x}px`;
  plusOne.style.top = `${y}px`;

  setTimeout(() => plusOne.remove(), 1000);
}
