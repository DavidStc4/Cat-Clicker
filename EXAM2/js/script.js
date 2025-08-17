// js/script.js
import { state } from './data.js';
import { incrementCat, updateClickDisplay } from './clicks.js';
import { renderCatShop } from './cats.js';
import { renderAchievements } from './achievements.js';
// FIX: include initAutoClickerFromState
import { buySecClicker, resetAutoClicker, initAutoClickerFromState } from './buffs.js';
import { closePopup, showMessage } from './ui.js';
import {
  loadState, saveState, registerUser, loginUser,
  logoutUser, getCurrentUser, resetStateInMemory
} from './storage.js';
// FIX: import checkBuffUnlock
import { checkBuffUnlock } from './buffsUnlock.js';

export let soundOn = true;
export const clickSound = document.getElementById('clickSound');
export const bgMusic = document.getElementById('bgMusic');

const initAuthUI = () => {
  const form = document.getElementById('authForm');
  const who = document.getElementById('authWho');
  const userIn = document.getElementById('authUser');
  const submitBtn = document.getElementById('authSubmit');
  const modeBtn = document.getElementById('authMode');
  const whoName = document.getElementById('whoName');
  const logoutBtn = document.getElementById('logoutBtn');

  const setMode = (mode) => {
    modeBtn.dataset.mode = mode;
    if (mode === 'login') { submitBtn.textContent = 'Sign in'; modeBtn.textContent = 'Create account'; }
    else { submitBtn.textContent = 'Create account'; modeBtn.textContent = 'Have an account? Sign in'; }
  };
  setMode('login');

  const refreshAuthView = () => {
    const u = getCurrentUser();
    if (u) {
      form.classList.add('hidden');
      who.classList.remove('hidden');
      whoName.textContent = u;
    } else {
      form.classList.remove('hidden');
      who.classList.add('hidden');
      userIn.focus();
    }
  };

  modeBtn.onclick = () => setMode(modeBtn.dataset.mode === 'login' ? 'register' : 'login');

  form.onsubmit = (e) => {
    e.preventDefault();
    const username = userIn.value.trim();
    if (username.length < 2) return showMessage('Username must be at least 2 chars', 'error');

    try {
      if (modeBtn.dataset.mode === 'register') {
        registerUser(username);
        showMessage('Account created & signed in!', 'success');
      } else {
        loginUser(username);
        showMessage('Signed in', 'success');
      }
      loadState();
      renderCatShop();
      renderAchievements();
      document.getElementById('mainCatImage').src = state.currentCat.img;
      updateClickDisplay();

      // ensure buff UI is synced after account switch
      initAutoClickerFromState();
      checkBuffUnlock();

      refreshAuthView();
    } catch (err) {
      showMessage(err.message || 'Auth error', 'error');
    }
  };

  logoutBtn.onclick = () => {
    saveState();
    logoutUser();
    resetAutoClicker();
    resetStateInMemory();
    renderCatShop();
    renderAchievements();
    document.getElementById('mainCatImage').src = state.currentCat.img;
    updateClickDisplay();
    showMessage('Logged out — new game started', 'success');
    refreshAuthView();
  };

  refreshAuthView();
};

window.onload = () => {
  initAuthUI();
  loadState();

  renderCatShop();
  renderAchievements();
  document.getElementById('mainCatImage').src = state.currentCat.img;
  updateClickDisplay();

  // ensure buffs reflect loaded state and unlock at 20+
  initAutoClickerFromState();
  checkBuffUnlock();

  bgMusic.volume = 0.3;
  clickSound.volume = 0.3;
  bgMusic.play();

  const mainCat = document.getElementById('mainCatImage');
  const soundToggle = document.getElementById('soundToggle');
  const volumeSlider = document.getElementById('volumeSlider');

  mainCat.onclick = () => {
    incrementCat();
    if (soundOn) { clickSound.currentTime = 0; clickSound.play(); }
    saveState();
  };

  soundToggle.onclick = () => {
    soundOn = !soundOn;
    if (soundOn) { bgMusic.play(); soundToggle.textContent = '🔊 Sound On'; }
    else { bgMusic.pause(); soundToggle.textContent = '🔇 Sound Off'; }
    saveState();
  };

  volumeSlider.value = bgMusic.volume;
  volumeSlider.oninput = () => {
    const volume = parseFloat(volumeSlider.value);
    bgMusic.volume = volume;
    clickSound.volume = volume;
  };

  document.getElementById('buffToggle').onclick = () => {
    const menu = document.querySelector('.menu-content');
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
  };

  document.getElementById('autoClickerBtn').onclick = () => buySecClicker();
  document.getElementById('closePopupBtn').onclick = () => closePopup();
};
