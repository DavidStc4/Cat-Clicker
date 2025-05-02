export const state = {
    clickCount: 0,
    currentCat: null,
    autoClickerUnlocked: false
  };
  
  export const cats = [
    { name: "Sad Cat", cost: 0, img: "/EXAM2/assets/cat_1.png", unlocked: true, clickValue: 1 },
    { name: "Beluga", cost: 50, img: "/EXAM2/assets/cat_2.png", unlocked: false, clickValue: 2 },
    { name: "Hui Cat", cost: 200, img: "/EXAM2/assets/cat_3.png", unlocked: false, clickValue: 5 },
  ];
  
  export const achievements = [
    { id: 1, name: 'First Click!', description: 'Make your very first click.', condition: clicks => clicks >= 1, unlocked: false },
    { id: 2, name: 'Click Novice', description: 'Reach 100 clicks.', condition: clicks => clicks >= 100, unlocked: false },
    { id: 3, name: 'Click Master', description: 'Reach 500 clicks.', condition: clicks => clicks >= 500, unlocked: false },
    { id: 4, name: 'Beluga Buyer', description: 'Unlock the Beluga cat.',condition: () => cats[1].unlocked, unlocked: false},
    { id: 5, name: 'Hui Cat Hero', description: 'Unlock the Hui Cat.', condition: () => cats[2].unlocked, unlocked: false},
    { id: 6, name: 'Buff Master', description: 'Unlock the Auto Clicker buff.', condition: () => state.autoClickerUnlocked, unlocked: false},
    
];
  
  state.currentCat = cats[0];
  