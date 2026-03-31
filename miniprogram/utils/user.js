const STORAGE_KEY = 'friend-menu-user-profile';
const { createPlaceholder } = require('./image');

const nicknamePool = [
  '奶盖观察员',
  '草莓味饭搭子',
  '今天也想加料',
  '软糖级别可爱',
  '云朵点单官',
  '晚风奶茶合伙人'
];

const avatarPool = [
  createPlaceholder('A', '#fed9e8', '#8f5a76'),
  createPlaceholder('B', '#ffe6bf', '#8f5a76'),
  createPlaceholder('C', '#e6f4ff', '#8f5a76'),
  createPlaceholder('D', '#e6ffe9', '#8f5a76')
];

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function createLocalUserProfile() {
  return {
    id: `guest_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
    nickName: pickRandom(nicknamePool),
    avatarUrl: pickRandom(avatarPool)
  };
}

function getLocalUserProfile() {
  const stored = wx.getStorageSync(STORAGE_KEY);

  if (stored && stored.id) {
    return stored;
  }

  const profile = createLocalUserProfile();
  wx.setStorageSync(STORAGE_KEY, profile);
  return profile;
}

function updateLocalUserProfile(patch) {
  const nextProfile = Object.assign({}, getLocalUserProfile(), patch);
  wx.setStorageSync(STORAGE_KEY, nextProfile);
  return nextProfile;
}

module.exports = {
  nicknamePool,
  avatarPool,
  getLocalUserProfile,
  updateLocalUserProfile
};
