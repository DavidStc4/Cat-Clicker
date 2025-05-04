export const state = {
    clickCount: 0,
    currentCat: null,
    autoClickerUnlocked: false,
    gameCompleted: false 
  };
  
  export const cats = [
    { name: "Crying Cat", cost: 0, img: "/EXAM2/assets/cat_1.png", unlocked: true, clickValue: 1 },
    { name: "Beluga", cost: 50, img: "/EXAM2/assets/cat_2.png", unlocked: false, clickValue: 2 },
    { name: "Grumpy", cost: 200, img: "/EXAM2/assets/cat_3.png", unlocked: false, clickValue: 5 },
    { name: "Coquette", cost: 400, img: "/EXAM2/assets/cat_4.png", unlocked: false, clickValue: 10 },
    { name: "Maxwell", cost: 800, img: "/EXAM2/assets/cat_5.png", unlocked: false, clickValue: 20 },
  ];
  
  export const achievements = [
    { id: 1, name: 'First Click!', description: 'Make your very first click.', condition: clicks => clicks >= 1, unlocked: false },
    { id: 2, name: 'Buff Master', description: 'Unlock the Auto Clicker buff.', condition: () => state.autoClickerUnlocked, unlocked: false},
    { id: 3, name: 'Beluga Buyer', description: 'Unlock the Beluga cat.',condition: () => cats[1].unlocked, unlocked: false},
    { id: 4, name: 'Click Novice', description: 'Reach 100 clicks.', condition: clicks => clicks >= 100, unlocked: false },
    { id: 5, name: 'Grumpy Hero', description: 'Unlock the Grumpy Cat.', condition: () => cats[2].unlocked, unlocked: false},
    { id: 6, name: 'Taller than Coquette', description: 'Unlock the Coquette Cat.', condition: () => cats[3].unlocked, unlocked: false},
    { id: 7, name: 'Click Master', description: 'Reach 500 clicks.', condition: clicks => clicks >= 500, unlocked: false },
    { id: 8, name: 'Spinning with Maxwell ', description: 'Unlock the Maxwell Cat.', condition: () => cats[4].unlocked, unlocked: false},
    { id: 9, name: 'Click Titan', description: 'Reach 1500 clicks.', condition: clicks => clicks >= 1500, unlocked: false },
    { id: 10, name: 'Cat Collector', description: 'Unlock all 5 cats.', condition: () => cats.every(cat => cat.unlocked), unlocked: false }

];
  
  state.currentCat = cats[0];
  