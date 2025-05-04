import { state } from './data.js';
import { updateClickDisplay, incrementCat} from './clicks.js';
import { showMessage } from './ui.js';
import { checkAchievements } from './achievements.js';


let autoClickerBought = false;
let autoClickerActive = false;
let autoClickerInterval = null;


export function buySecClicker() {
  const button = document.getElementById('autoClickerBtn');
  const cost = 20;

  if (!button.classList.contains('unlocked')) {
    showMessage("You must reach 20 clicks to unlock this buff!", "error");
    return;
  }

  if (!autoClickerBought) {
    if (state.clickCount >= cost) {
      state.clickCount -= cost;
      updateClickDisplay();
      autoClickerBought = true;
      autoClickerActive = true;
      button.innerText = 'Auto Clicker Activated!';
      button.classList.remove('inactive');
      button.classList.add('active');
      autoClickerInterval = setInterval(() => incrementCat(), 1000);
      state.autoClickerUnlocked = true;
      checkAchievements(state.clickCount);
    } else {
      showMessage("Not enough clicks to buy Auto Clicker!", "error");
    }
  } else {
    autoClickerActive = !autoClickerActive;
    button.innerText = autoClickerActive ? 'Auto Clicker Activated!' : 'Auto Clicker Deactivated!';
    button.classList.toggle('active', autoClickerActive);
    button.classList.toggle('inactive', !autoClickerActive);

    if (autoClickerActive) {
      autoClickerInterval = setInterval(() => incrementCat(), 1000);
    } else {
      clearInterval(autoClickerInterval);
    }
  }
}




