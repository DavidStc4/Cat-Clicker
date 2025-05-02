export function showMessage(text, type = 'error') {
    const messageBox = document.getElementById('messageBox');
    messageBox.innerText = text;
    messageBox.style.backgroundColor = type === 'success' ? '#66bb6a' : '#ef5350';
    messageBox.classList.remove('hidden', 'fade-out');
    messageBox.classList.add('show');
  
    setTimeout(() => {
      messageBox.classList.remove('show');
      setTimeout(() => messageBox.classList.add('hidden'), 400);
    }, 2000);
  }
  
  export function notifyUser(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    toast.classList.remove('hidden');
  
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.classList.add('hidden'), 500);
    }, 3000);
  }
  
  export function openAchievementPopup(achievement) {
    const popup = document.getElementById('achievementPopup');
    const popupTitle = document.getElementById('popupTitle');
    const popupDescription = document.getElementById('popupDescription');
    popupTitle.textContent = achievement.name;
    popupDescription.textContent = achievement.unlocked
      ? achievement.description
      : 'Achievement locked. Keep clicking to unlock!';
    popup.classList.remove('hidden');
  }
  
  export function closePopup() {
    document.getElementById('achievementPopup').classList.add('hidden');
  }
  