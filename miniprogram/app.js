const { cloudConfig } = require('./config/index');
const { getLocalUserProfile } = require('./utils/user');
const { createShopIllustration } = require('./utils/image');

App({
  globalData: {
    cloudReady: false,
    cloudConfig,
    userProfile: null,
    shopInfo: {
      name: '奶呼呼友情食堂',
      avatar: createShopIllustration(),
      tagline: '今天也想和你一起点点看',
      notice: '本店不接现实付款，只负责把可爱和食欲一起送到你心里。'
    }
  },

  onLaunch() {
    const userProfile = getLocalUserProfile();
    this.globalData.userProfile = userProfile;

    if (!wx.cloud) {
      console.warn('当前基础库不支持云能力，请升级微信开发者工具。');
      return;
    }

    if (!cloudConfig.envId || cloudConfig.envId === 'your-cloud-env-id') {
      console.warn('请先在 miniprogram/config/index.js 中配置云环境 ID。');
      return;
    }

    wx.cloud.init({
      env: cloudConfig.envId,
      traceUser: true
    });

    this.globalData.cloudReady = true;
  }
});
