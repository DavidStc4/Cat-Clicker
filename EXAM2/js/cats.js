import { cats, state } from './data.js';
import { updateClickDisplay } from './clicks.js';
import { showMessage } from './ui.js';
import { checkAchievements } from './achievements.js';

export function renderCatShop() {
  const list = document.getElementById('catList');
  list.innerHTML = '';

  cats.forEach((cat, index) => {
    const div = document.createElement('div');
    div.className = 'cat-item';

    if (cat === state.currentCat) div.classList.add('selected');
    else if (cat.unlocked) div.classList.add('owned');
    else if (state.clickCount >= cat.cost) div.classList.add('buyable');

    div.innerHTML = `
      <img src="${cat.img}" alt="${cat.name}">
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
      } else {
        showMessage(`Not enough clicks to buy ${cat.name}`, 'error');
      }
      renderCatShop();
      updateClickDisplay();
    };

    list.appendChild(div);
  });
}

export function selectCat(index) {
  state.currentCat = cats[index];
  document.getElementById('mainCatImage').src = state.currentCat.img;
}
