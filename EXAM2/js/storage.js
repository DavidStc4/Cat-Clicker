// js/storage.js
import { state, cats, achievements } from './data.js';

const PREFIX = 'cat_clicker_v2';
const USERS_KEY = `${PREFIX}:users`;
const CURRENT_KEY = `${PREFIX}:currentUser`;

const getUsers = () => JSON.parse(localStorage.getItem(USERS_KEY) || '{}');
const setUsers = (u) => localStorage.setItem(USERS_KEY, JSON.stringify(u));

export const getCurrentUser = () => localStorage.getItem(CURRENT_KEY) || '';
export const setCurrentUser = (u) => localStorage.setItem(CURRENT_KEY, u);
export const logoutUser = () => setCurrentUser('');
export const userExists = (u) => !!getUsers()[u];

export const registerUser = (username) => {
  const users = getUsers();
  if (users[username]) throw new Error('User already exists');
  users[username] = { createdAt: Date.now() };
  setUsers(users);
  localStorage.setItem(`${PREFIX}:user:${username}`, JSON.stringify(defaultPayload()));
  setCurrentUser(username);
};

export const loginUser = (username) => {
  const users = getUsers();
  if (!users[username]) throw new Error('User not found');
  setCurrentUser(username);
};

const defaultPayload = () => ({
  clickCount: 0,
  autoClickerUnlocked: false,
  gameCompleted: false,
  catsUnlocked: cats.map((_, i) => i === 0),
  currentCatIndex: 0,
  achievementsUnlocked: achievements.map(() => false),
  playerName: ''
});

export const saveState = () => {
  const u = getCurrentUser();
  if (!u) return;
  const payload = {
    clickCount: state.clickCount,
    autoClickerUnlocked: state.autoClickerUnlocked,
    gameCompleted: state.gameCompleted,
    catsUnlocked: cats.map(c => !!c.unlocked),
    currentCatIndex: Math.max(0, cats.findIndex(c => c === state.currentCat)),
    achievementsUnlocked: achievements.map(a => !!a.unlocked),
    playerName: state.playerName || ''
  };
  localStorage.setItem(`${PREFIX}:user:${u}`, JSON.stringify(payload));
};

export const loadState = () => {
  const u = getCurrentUser();
  if (!u) return;
  const raw = localStorage.getItem(`${PREFIX}:user:${u}`);
  if (!raw) return;
  try {
    const d = JSON.parse(raw);
    state.clickCount = d.clickCount ?? 0;
    state.autoClickerUnlocked = !!d.autoClickerUnlocked;
    state.gameCompleted = !!d.gameCompleted;
    cats.forEach((c, i) => c.unlocked = !!(d.catsUnlocked?.[i]));
    state.currentCat = cats[d.currentCatIndex ?? 0] || cats[0];
    achievements.forEach((a, i) => a.unlocked = !!(d.achievementsUnlocked?.[i]));
    state.playerName = d.playerName || '';
  } catch {}
};

// NEW: reset in-memory state to a fresh game (no user)
export const resetStateInMemory = () => {
  state.clickCount = 0;
  state.autoClickerUnlocked = false;
  state.gameCompleted = false;
  state.playerName = '';
  cats.forEach((c, i) => c.unlocked = (i === 0));
  state.currentCat = cats[0];
  achievements.forEach(a => a.unlocked = false);
};
