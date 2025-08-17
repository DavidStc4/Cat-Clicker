// js/buffs.js
import { state } from './data.js';
import { updateClickDisplay, incrementCat } from './clicks.js';
import { showMessage } from './ui.js';
import { checkAchievements } from './achievements.js';
import { checkBuffUnlock } from './buffsUnlock.js';
import { saveState } from './storage.js';

let autoClickerBought = false;
let autoClickerActive = false;
let autoClickerInterval = null;

const getBtn = () => document.getElementById('autoClickerBtn');
const getDot = () => document.getElementById('buffDot');

export const initAutoClickerFromState = () => {
  const btn = getBtn(); const dot = getDot();
  if (!btn) return;

  // If the player already has >=20 clicks on load, ensure "unlocked" class is present
  if (state.clickCount >= 20) btn.classList.add('unlocked');

  if (state.autoClickerUnlocked) {
    // Was already purchased in this profile
    autoClickerBought = true;
    autoClickerActive = false; // start inactive on load
    btn.classList.add('unlocked', 'inactive');
    btn.classList.remove('active');
    btn.innerText = 'Auto Clicker Deactivated!';
    dot && dot.classList.add('hidden');
  } else {
    // Not purchased yet
    autoClickerBought = false;
    autoClickerActive = false;
    btn.classList.remove('active', 'inactive');
    btn.innerText = btn.classList.contains('unlocked') ? 'Unlock: Auto Click Cost 20' : 'Locked Buff: Auto Click';
  }
};

export const resetAutoClicker = () => {
  if (autoClickerInterval) clearInterval(autoClickerInterval);
  autoClickerInterval = null;
  autoClickerActive = false;
  autoClickerBought = false;
  const btn = getBtn(); const dot = getDot();
  if (btn) {
    btn.classList.remove('active','inactive','unlocked');
    btn.innerText = 'Locked Buff: Auto Click';
  }
  dot && dot.classList.add('hidden');
};

export const buySecClicker = () => {
  const btn = getBtn(); if (!btn) return;
  const cost = 20;

  // Ensure UI is up-to-date with the current clickCount
  checkBuffUnlock();

  if (!btn.classList.contains('unlocked')) {
    showMessage("You must reach 20 clicks to unlock this buff!", "error");
    return;
  }

  if (!autoClickerBought) {
    if (state.clickCount >= cost) {
      state.clickCount -= cost;
      updateClickDisplay();

      autoClickerBought = true;
      autoClickerActive = true;
      state.autoClickerUnlocked = true;

      btn.innerText = 'Auto Clicker Activated!';
      btn.classList.remove('inactive');
      btn.classList.add('active');

      autoClickerInterval = setInterval(() => incrementCat(false), 1000);

      checkAchievements(state.clickCount);
      saveState();
    } else {
      showMessage("Not enough clicks to buy Auto Clicker!", "error");
    }
  } else {
    // Toggle on/off if already bought
    autoClickerActive = !autoClickerActive;
    btn.innerText = autoClickerActive ? 'Auto Clicker Activated!' : 'Auto Clicker Deactivated!';
    btn.classList.toggle('active', autoClickerActive);
    btn.classList.toggle('inactive', !autoClickerActive);

    if (autoClickerActive) {
      autoClickerInterval = setInterval(() => incrementCat(false), 1000);
    } else {
      clearInterval(autoClickerInterval);
    }
    saveState();
  }
};
