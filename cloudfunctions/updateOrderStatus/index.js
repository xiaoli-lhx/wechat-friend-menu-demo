const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

exports.main = async (event) => {
  const orderId = event.orderId;
  const userId = event.userId;
  const nextStatus = event.status || '已完成';

  if (!orderId || !userId) {
    return {
      success: false,
      message: '缺少订单信息，暂时没法更新状态。'
    };
  }

  const updateResult = await db
    .collection('orders')
    .where({
      _id: orderId,
      userId
    })
    .update({
      data: {
        status: nextStatus,
        updatedAt: new Date()
      }
    });

  if (!updateResult.stats || !updateResult.stats.updated) {
    return {
      success: false,
      message: '没有找到这笔订单，或者它已经被更新过了。'
    };
  }

  return {
    success: true,
    orderId,
    status: nextStatus
  };
};
