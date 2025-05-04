import { achievements } from './data.js';
import { notifyUser, openAchievementPopup } from './ui.js';
import { state } from './data.js';

export function renderAchievements() {
  const list = document.getElementById('achievementList');
  list.innerHTML = '';
  achievements.forEach(ach => {
    const el = document.createElement('div');
    el.className = 'achievement-item ' + (ach.unlocked ? 'unlocked' : 'locked');
    el.textContent = ach.name;
    el.onclick = () => openAchievementPopup(ach);
    list.appendChild(el);
  });
}

export function checkAchievements(clickCount) {
  achievements.forEach(ach => {
    if (!ach.unlocked && ach.condition(clickCount)) {
      ach.unlocked = true;
      notifyUser(`Unlocked: ${ach.name}`);
      renderAchievements();
    }
  });

  if (clickCount >= 1500 && !state.gameCompleted) {
    state.gameCompleted = true;
    openAchievementPopup({
      name: 'You Finished the Game!',
      description: '🎉 Congratulations! You’ve reached 1500 clicks and completed the game. You can still continue playing and rescuing cats! 🐾'
    });
  }
}
