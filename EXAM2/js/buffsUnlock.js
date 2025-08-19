import { state } from './data.js';

export function checkBuffUnlock() {
  const secClicker = document.getElementById('autoClickerBtn');
  const buffDot = document.getElementById('buffDot');

  if (!secClicker) return; 
  
  if (state.clickCount >= 20 && !secClicker.classList.contains('unlocked')) {
    secClicker.classList.add('unlocked');
    secClicker.innerText = 'Unlock: Auto Click Cost 20';
  }

  if (buffDot) {
    if (secClicker.classList.contains('unlocked') && !secClicker.classList.contains('active')) {
      buffDot.classList.remove('hidden');
    } else {
      buffDot.classList.add('hidden');
    }
  }
}