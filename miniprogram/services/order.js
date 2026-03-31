const { cloudConfig } = require('../config/index');

const LOCAL_ORDER_KEY_PREFIX = 'friend-menu-orders';

function getStorageKey(userId) {
  return `${LOCAL_ORDER_KEY_PREFIX}-${userId}`;
}

function getTimeValue(input) {
  if (!input) {
    return 0;
  }

  if (typeof input === 'number') {
    return input;
  }

  if (input instanceof Date) {
    return input.getTime();
  }

  if (typeof input === 'string') {
    return new Date(input).getTime();
  }

  if (typeof input === 'object' && input.seconds) {
    return input.seconds * 1000;
  }

  return 0;
}

function sortOrders(list) {
  return (list || []).sort((a, b) => getTimeValue(b.createdAt) - getTimeValue(a.createdAt));
}

function getLocalOrders(userId) {
  const list = wx.getStorageSync(getStorageKey(userId)) || [];
  return sortOrders(list);
}

function saveLocalOrders(userId, list) {
  wx.setStorageSync(getStorageKey(userId), list);
}

function updateLocalOrderStatus(params) {
  const currentOrders = getLocalOrders(params.userId);
  const nextOrders = currentOrders.map((order) => {
    if (order._id !== params.orderId) {
      return order;
    }

    return Object.assign({}, order, {
      status: params.status,
      updatedAt: Date.now()
    });
  });

  saveLocalOrders(params.userId, nextOrders);

  return Promise.resolve({
    success: true,
    orderId: params.orderId,
    status: params.status,
    local: true
  });
}

function createLocalOrder(payload) {
  const now = Date.now();
  const order = {
    _id: `local_${now}`,
    userId: payload.userId,
    userName: payload.userName,
    items: payload.items,
    totalPrice: payload.totalPrice,
    remark: payload.remark || '',
    status: '已提交',
    createdAt: now,
    updatedAt: now
  };

  const currentOrders = getLocalOrders(payload.userId);
  currentOrders.unshift(order);
  saveLocalOrders(payload.userId, currentOrders);

  return Promise.resolve({
    success: true,
    orderId: order._id,
    local: true
  });
}

function createOrder(payload) {
  const app = getApp();

  if (!app.globalData.cloudReady || !cloudConfig.useCloudOrder) {
    return createLocalOrder(payload);
  }

  return wx.cloud
    .callFunction({
      name: 'createOrder',
      data: payload
    })
    .then((res) => res.result);
}

function getOrders(params) {
  const app = getApp();
  const userId = params.userId;

  if (!app.globalData.cloudReady || !cloudConfig.useCloudOrder) {
    return Promise.resolve(getLocalOrders(userId));
  }

  const db = wx.cloud.database();

  return db
    .collection('orders')
    .where({
      userId
    })
    .get()
    .then((res) => sortOrders(res.data || []))
    .catch(() => getLocalOrders(userId));
}

function getOrderCount(params) {
  return getOrders(params).then((orders) => orders.length);
}

function updateOrderStatus(params) {
  const app = getApp();

  if (!app.globalData.cloudReady || !cloudConfig.useCloudOrder) {
    return updateLocalOrderStatus(params);
  }

  return wx.cloud
    .callFunction({
      name: 'updateOrderStatus',
      data: params
    })
    .then((res) => res.result);
}

module.exports = {
  createOrder,
  getOrders,
  getOrderCount,
  updateOrderStatus
};
