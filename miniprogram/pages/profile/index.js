const { getOrderCount } = require('../../services/order');
const { nicknamePool, avatarPool, updateLocalUserProfile } = require('../../utils/user');

function getFunText(totalOrders) {
  if (!totalOrders) {
    return '今日战绩暂时是 0 单，但你看起来已经很适合先点一杯再说。';
  }

  if (totalOrders < 3) {
    return '你已经开始掌握点单节奏了，朋友局气氛正在慢慢升温。';
  }

  if (totalOrders < 8) {
    return '你现在像一位轻车熟路的友情菜单策展人，随手一点都很会。';
  }

  return '你已经把这份电子菜单玩成了固定节目，建议给自己颁发一枚点单小勋章。';
}

Page({
  data: {
    userProfile: {},
    totalOrders: 0,
    funText: '',
    draftName: ''
  },

  onShow() {
    this.loadProfile();
  },

  async loadProfile() {
    const app = getApp();
    const userProfile = app.globalData.userProfile;

    try {
      const totalOrders = await getOrderCount({
        userId: userProfile.id
      });

      this.setData({
        userProfile,
        totalOrders,
        funText: getFunText(totalOrders),
        draftName: userProfile.nickName || ''
      });
    } catch (error) {
      this.setData({
        userProfile,
        totalOrders: 0,
        funText: getFunText(0),
        draftName: userProfile.nickName || ''
      });
    }
  },

  handleNameInput(event) {
    this.setData({
      draftName: event.detail.value || ''
    });
  },

  handleSaveName() {
    const nickName = (this.data.draftName || '').trim();

    if (nickName.length < 2 || nickName.length > 12) {
      wx.showToast({
        title: '昵称请控制在 2 到 12 个字',
        icon: 'none'
      });
      return;
    }

    const nextProfile = updateLocalUserProfile({
      nickName
    });

    const app = getApp();
    app.globalData.userProfile = nextProfile;

    this.setData({
      userProfile: nextProfile,
      draftName: nextProfile.nickName
    });

    wx.showToast({
      title: '名字已经存好啦',
      icon: 'none'
    });
  },

  handleRefreshProfile() {
    const nextProfile = updateLocalUserProfile({
      nickName: nicknamePool[Math.floor(Math.random() * nicknamePool.length)],
      avatarUrl: avatarPool[Math.floor(Math.random() * avatarPool.length)]
    });

    const app = getApp();
    app.globalData.userProfile = nextProfile;
    this.setData({
      draftName: nextProfile.nickName
    });
    this.loadProfile();
  },

  goMenu() {
    wx.switchTab({
      url: '/pages/menu/index'
    });
  }
});
