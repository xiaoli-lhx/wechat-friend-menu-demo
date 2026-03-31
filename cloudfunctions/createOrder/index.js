const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();
const _ = db.command;

exports.main = async (event) => {
  const wxContext = cloud.getWXContext();
  const items = Array.isArray(event.items) ? event.items : [];
  const remark = `${event.remark || ''}`.slice(0, 80);
  const userName = event.userName || '匿名饭搭子';
  const userId = event.userId || wxContext.OPENID;

  if (!items.length) {
    return {
      success: false,
      message: '购物车是空的，先选点好吃的吧。'
    };
  }

  const normalizedItems = items.map((item) => ({
    itemId: item.itemId || '',
    categoryId: item.categoryId || '',
    name: item.name || '未命名商品',
    price: Number(item.price || 0),
    count: Math.max(Number(item.count || 1), 1),
    image: item.image || '',
    selectedSpecs: Array.isArray(item.selectedSpecs) ? item.selectedSpecs : [],
    specSummary: item.specSummary || ''
  }));

  const calculatedTotalPrice = normalizedItems.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );

  const orderData = {
    userId,
    userName,
    items: normalizedItems,
    totalPrice: Number(
      (Number(event.totalPrice || calculatedTotalPrice) || calculatedTotalPrice).toFixed(2)
    ),
    remark,
    status: '已提交',
    createdAt: new Date(),
    updatedAt: new Date(),
    openId: wxContext.OPENID
  };

  const result = await db.collection('orders').add({
    data: orderData
  });

  await Promise.all(
    normalizedItems
      .filter((item) => item.itemId)
      .map((item) =>
        db
          .collection('menu_items')
          .doc(item.itemId)
          .update({
            data: {
              monthlySales: _.inc(item.count)
            }
          })
          .catch(() => null)
      )
  );

  return {
    success: true,
    orderId: result._id,
    totalPrice: orderData.totalPrice,
    status: orderData.status
  };
};
