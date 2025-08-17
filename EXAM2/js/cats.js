// js/cats.js
import { cats, state } from './data.js';
import { updateClickDisplay } from './clicks.js';
import { showMessage, openAchievementPopup } from './ui.js';
import { checkAchievements } from './achievements.js';
import { saveState } from './storage.js';

export const renderCatShop = () => {
  const list = document.getElementById('catList');
  list.innerHTML = '';

  cats.forEach((cat, index) => {
    const div = document.createElement('div');
    div.className = 'cat-item';
    if (cat === state.currentCat) div.classList.add('selected');
    else if (cat.unlocked) div.classList.add('owned');
    else if (state.clickCount >= cat.cost) div.classList.add('buyable');

    div.innerHTML = `
      <div class="cat-wrapper">
        <img class="cat-img" src="${cat.img}" alt="${cat.name}">
        <img class="prison-bars ${cat.unlocked ? 'hidden' : ''}" src="assets/prisonBars.png" alt="bars">
      </div>
      <div>${cat.name}</div>
      <div>${cat.unlocked ? 'Click to select' : `Cost: ${cat.cost}`}</div>
    `;

    div.onclick = () => {
      if (cat.unlocked) {
        selectCat(index);
      } else if (state.clickCount >= cat.cost) {
        state.clickCount -= cat.cost;
        cats[index].unlocked = true;
        selectCat(index);
        checkAchievements(state.clickCount);
        openAchievementPopup({
          name: `${cat.name} Freed!`,
          description: "You've rescued this cat!"
        });
      } else {
        showMessage(`Not enough clicks to buy ${cat.name}`, 'error');
      }
      renderCatShop();
      updateClickDisplay();
      saveState();
    };

    list.appendChild(div);

    if (cat.unlocked) {
      const bars = div.querySelector('.prison-bars');
      if (bars && !bars.classList.contains('hidden')) {
        bars.classList.add('animate-exit');
        setTimeout(() => bars.remove(), 600);
      }
    }
  });
};

export const selectCat = (index) => {
  state.currentCat = cats[index];
  document.getElementById('mainCatImage').src = state.currentCat.img;
  saveState();
};
