const { getOrders, updateOrderStatus } = require('../../services/order');
const { formatTime } = require('../../utils/format');

Page({
  data: {
    orders: [],
    loading: true,
    updatingOrderId: ''
  },

  onShow() {
    this.loadOrders();
  },

  onPullDownRefresh() {
    this.loadOrders({ stopRefresh: true });
  },

  decorateOrder(order) {
    const items = order.items || [];
    const summary = items
      .slice(0, 3)
      .map((item) => {
        const specText = item.specSummary ? `（${item.specSummary}）` : '';
        return `${item.name}${specText} x${item.count}`;
      })
      .join('、');

    return Object.assign({}, order, {
      summary: summary || '这单有点神秘',
      displayTime: formatTime(order.createdAt),
      statusClass: order.status === '已完成' ? 'status-done' : 'status-submitted'
    });
  },

  async loadOrders(options = {}) {
    const app = getApp();
    const userId = app.globalData.userProfile.id;

    this.setData({ loading: true });

    try {
      const orders = await getOrders({ userId });

      this.setData({
        orders: orders.map((order) => this.decorateOrder(order))
      });
    } catch (error) {
      wx.showToast({
        title: '订单暂时没刷出来',
        icon: 'none'
      });
    } finally {
      this.setData({ loading: false });

      if (options.stopRefresh) {
        wx.stopPullDownRefresh();
      }
    }
  },

  async handleCompleteOrder(event) {
    const orderId = event.currentTarget.dataset.id;
    const status = event.currentTarget.dataset.status;

    if (!orderId || status === '已完成' || this.data.updatingOrderId) {
      return;
    }

    const app = getApp();
    const userId = app.globalData.userProfile.id;

    try {
      this.setData({
        updatingOrderId: orderId
      });

      const result = await updateOrderStatus({
        orderId,
        userId,
        status: '已完成'
      });

      if (!result || result.success === false) {
        throw new Error((result && result.message) || '更新失败');
      }

      wx.showToast({
        title: '这单已经完成啦',
        icon: 'none'
      });

      this.loadOrders();
    } catch (error) {
      wx.showToast({
        title: error.message || '状态更新失败',
        icon: 'none'
      });
    } finally {
      this.setData({
        updatingOrderId: ''
      });
    }
  }
});
