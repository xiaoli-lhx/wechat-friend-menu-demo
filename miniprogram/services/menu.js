const { mockMenuData } = require('../mockData/menu');
const { cloudConfig } = require('../config/index');

function cloneMockData() {
  return JSON.parse(JSON.stringify(mockMenuData));
}

function sortItems(items) {
  return items
    .filter((item) => item.active !== false)
    .sort((a, b) => (a.sort || 0) - (b.sort || 0));
}

function getMenuData() {
  const app = getApp();

  if (!app.globalData.cloudReady || !cloudConfig.useCloudMenu) {
    return Promise.resolve(cloneMockData());
  }

  const db = wx.cloud.database();

  return Promise.all([
    db.collection('menu_categories').where({ active: true }).orderBy('sort', 'asc').get(),
    db.collection('menu_items').where({ active: true }).get()
  ])
    .then(([categoryRes, itemRes]) => ({
      categories: categoryRes.data || [],
      items: sortItems(itemRes.data || [])
    }))
    .catch(() => cloneMockData());
}

module.exports = {
  getMenuData
};
