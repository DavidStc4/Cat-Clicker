import { incrementCat } from './clicks.js';
import { renderCatShop } from './cats.js';
import { renderAchievements } from './achievements.js';
import { buySecClicker } from './buffs.js';
import { closePopup } from './ui.js';

export let soundOn = true;
export const clickSound = document.getElementById('clickSound');
export const bgMusic = document.getElementById('bgMusic');

window.onload = () => {
  renderCatShop();
  renderAchievements();

  bgMusic.volume = 0.3;
  clickSound.volume = 0.3;
  bgMusic.play();

  const mainCat = document.getElementById('mainCatImage');
  const soundToggle = document.getElementById('soundToggle');
  const volumeSlider = document.getElementById('volumeSlider');

  mainCat.onclick = () => {
    incrementCat();
    if (soundOn) {
      clickSound.currentTime = 0;
      clickSound.play();
    }
  };

  soundToggle.onclick = () => {
    soundOn = !soundOn;

    if (soundOn) {
      bgMusic.play();
      soundToggle.textContent = '🔊 Sound On';
    } else {
      bgMusic.pause();
      soundToggle.textContent = '🔇 Sound Off';
    }
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
