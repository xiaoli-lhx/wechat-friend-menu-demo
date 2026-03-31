const { getMenuData } = require('../../services/menu');
const { createOrder } = require('../../services/order');

Page({
  data: {
    shopInfo: {},
    modeText: '本地菜单试玩中',
    categories: [],
    allItems: [],
    currentCategoryId: '',
    currentItems: [],
    cartMap: {},
    cartItems: [],
    cartCount: 0,
    cartTotalPrice: '0.00',
    cartVisible: false,
    specPopupVisible: false,
    specDraftItem: null,
    specDraftSelections: [],
    remark: '',
    loading: true,
    submitting: false
  },

  onLoad() {
    const app = getApp();

    this.setData({
      shopInfo: app.globalData.shopInfo,
      modeText: app.globalData.cloudReady ? '云端订单已接通' : '本地试玩中，配置云环境后可同步到数据库'
    });

    this.loadMenu();
  },

  onShow() {
    if (this.data.categories.length || this.data.allItems.length) {
      this.loadMenu();
    }
  },

  async loadMenu() {
    this.setData({ loading: true });

    try {
      const menuData = await getMenuData();
      const categories = menuData.categories || [];
      const allItems = menuData.items || [];
      const firstCategoryId = categories.length ? categories[0]._id : '';
      const currentCategoryId = this.data.currentCategoryId || firstCategoryId;

      this.setData({
        categories,
        allItems
      });

      this.updateCurrentItems(currentCategoryId, allItems, this.data.cartMap);
    } catch (error) {
      wx.showToast({
        title: '菜单布置失败啦',
        icon: 'none'
      });
    } finally {
      this.setData({ loading: false });
    }
  },

  getItemById(itemId) {
    return this.data.allItems.find((item) => item._id === itemId);
  },

  cloneSelectedSpecs(specGroups = []) {
    return specGroups.map((group) => ({
      groupId: group.id,
      groupName: group.name,
      value: group.defaultValue || (group.options && group.options[0]) || ''
    }));
  },

  buildSpecSummary(selectedSpecs = []) {
    return selectedSpecs
      .filter((spec) => spec && spec.value)
      .map((spec) => spec.value)
      .join(' / ');
  },

  buildCartItemKey(itemId, selectedSpecs = []) {
    const specPart = selectedSpecs
      .map((spec) => `${spec.groupId}:${spec.value}`)
      .sort()
      .join('|');

    return specPart ? `${itemId}__${specPart}` : `${itemId}__default`;
  },

  buildCartList(cartMap = this.data.cartMap) {
    return Object.keys(cartMap)
      .map((key) => cartMap[key])
      .sort((a, b) => getSortTime(a.addedAt) - getSortTime(b.addedAt));
  },

  getItemCartCount(itemId, cartMap = this.data.cartMap) {
    return Object.keys(cartMap).reduce((sum, key) => {
      const cartItem = cartMap[key];
      return cartItem.itemId === itemId ? sum + cartItem.count : sum;
    }, 0);
  },

  buildCurrentItems(categoryId, allItems = this.data.allItems, cartMap = this.data.cartMap) {
    return allItems
      .filter((item) => item.categoryId === categoryId)
      .map((item) =>
        Object.assign({}, item, {
          cartCount: this.getItemCartCount(item._id, cartMap)
        })
      );
  },

  updateCurrentItems(categoryId, allItems, cartMap) {
    const currentItems = this.buildCurrentItems(categoryId, allItems, cartMap);

    this.setData({
      currentCategoryId: categoryId,
      currentItems
    });
  },

  refreshCart(cartMap) {
    const cartItems = this.buildCartList(cartMap);
    const cartCount = cartItems.reduce((sum, item) => sum + item.count, 0);
    const cartTotalPrice = cartItems.reduce((sum, item) => sum + item.price * item.count, 0);
    const currentItems = this.buildCurrentItems(this.data.currentCategoryId, this.data.allItems, cartMap);

    this.setData({
      cartMap,
      cartItems,
      cartCount,
      cartTotalPrice: cartTotalPrice.toFixed(2),
      currentItems,
      cartVisible: cartCount ? this.data.cartVisible : false
    });
  },

  setCartLineCount(item, selectedSpecs, nextCount, cartKey) {
    const itemId = item._id;
    const normalizedSpecs = selectedSpecs || [];
    const key = cartKey || this.buildCartItemKey(itemId, normalizedSpecs);
    const cartMap = Object.assign({}, this.data.cartMap);
    const current = cartMap[key];

    if (nextCount <= 0) {
      delete cartMap[key];
    } else {
      cartMap[key] = Object.assign({}, item, current || {}, {
        cartKey: key,
        itemId,
        count: nextCount,
        addedAt: current && current.addedAt ? current.addedAt : Date.now(),
        selectedSpecs: normalizedSpecs,
        specSummary: this.buildSpecSummary(normalizedSpecs)
      });
    }

    this.refreshCart(cartMap);
  },

  openSpecPopup(item) {
    this.setData({
      specPopupVisible: true,
      cartVisible: false,
      specDraftItem: item,
      specDraftSelections: this.cloneSelectedSpecs(item.specGroups || [])
    });
  },

  closeSpecPopup() {
    this.setData({
      specPopupVisible: false,
      specDraftItem: null,
      specDraftSelections: []
    });
  },

  handleDraftSpecSelect(event) {
    const groupId = event.currentTarget.dataset.groupId;
    const value = event.currentTarget.dataset.value;

    if (!groupId || !value) {
      return;
    }

    const nextSelections = (this.data.specDraftSelections || []).map((spec) => {
      if (spec.groupId !== groupId) {
        return spec;
      }

      return Object.assign({}, spec, { value });
    });

    this.setData({
      specDraftSelections: nextSelections
    });
  },

  handleConfirmSpec() {
    const item = this.data.specDraftItem;

    if (!item) {
      return;
    }

    const selectedSpecs = this.data.specDraftSelections || [];
    const cartKey = this.buildCartItemKey(item._id, selectedSpecs);
    const current = this.data.cartMap[cartKey];

    this.setCartLineCount(item, selectedSpecs, current ? current.count + 1 : 1, cartKey);
    this.closeSpecPopup();
  },

  handleCategoryTap(event) {
    const categoryId = event.currentTarget.dataset.id;

    if (!categoryId || categoryId === this.data.currentCategoryId) {
      return;
    }

    this.updateCurrentItems(categoryId);
  },

  handleAddItem(event) {
    const cartKey = event.currentTarget.dataset.cartKey;
    const itemId = event.currentTarget.dataset.id;
    const cartCurrent = cartKey ? this.data.cartMap[cartKey] : null;

    if (cartCurrent) {
      this.setCartLineCount(
        cartCurrent,
        cartCurrent.selectedSpecs || [],
        cartCurrent.count + 1,
        cartKey
      );
      return;
    }

    const item = this.getItemById(itemId);

    if (!item) {
      return;
    }

    if (item.specGroups && item.specGroups.length) {
      this.openSpecPopup(item);
      return;
    }

    const defaultCartKey = this.buildCartItemKey(item._id, []);
    const current = this.data.cartMap[defaultCartKey];
    this.setCartLineCount(item, [], current ? current.count + 1 : 1, defaultCartKey);
  },

  handleMinusItem(event) {
    const cartKey = event.currentTarget.dataset.cartKey;
    const itemId = event.currentTarget.dataset.id;

    if (cartKey) {
      const current = this.data.cartMap[cartKey];

      if (!current) {
        return;
      }

      this.setCartLineCount(current, current.selectedSpecs || [], current.count - 1, cartKey);
      return;
    }

    if (!itemId) {
      return;
    }

    const matchedKey = Object.keys(this.data.cartMap).find((key) => this.data.cartMap[key].itemId === itemId);

    if (!matchedKey) {
      return;
    }

    const current = this.data.cartMap[matchedKey];
    this.setCartLineCount(current, current.selectedSpecs || [], current.count - 1, matchedKey);
  },

  handleSelectSpec(event) {
    const cartKey = event.currentTarget.dataset.cartKey;
    const groupId = event.currentTarget.dataset.groupId;
    const value = event.currentTarget.dataset.value;
    const current = this.data.cartMap[cartKey];

    if (!current || !groupId || !value) {
      return;
    }

    const nextSelectedSpecs = (current.selectedSpecs || []).map((spec) => {
      if (spec.groupId !== groupId) {
        return spec;
      }

      return Object.assign({}, spec, {
        value
      });
    });

    const nextCartKey = this.buildCartItemKey(current.itemId, nextSelectedSpecs);
    const cartMap = Object.assign({}, this.data.cartMap);
    delete cartMap[cartKey];

    const mergedCurrent = cartMap[nextCartKey];
    const nextCount = (mergedCurrent ? mergedCurrent.count : 0) + current.count;

    cartMap[nextCartKey] = Object.assign({}, current, mergedCurrent || {}, {
      cartKey: nextCartKey,
      count: nextCount,
      selectedSpecs: nextSelectedSpecs,
      specSummary: this.buildSpecSummary(nextSelectedSpecs),
      addedAt: mergedCurrent && mergedCurrent.addedAt ? mergedCurrent.addedAt : current.addedAt
    });

    this.refreshCart(cartMap);
  },

  handleRandomPick() {
    const candidates = this.data.allItems.filter((item) => item.active !== false);

    if (!candidates.length) {
      return;
    }

    const randomItem = candidates[Math.floor(Math.random() * candidates.length)];

    if (randomItem.specGroups && randomItem.specGroups.length) {
      this.openSpecPopup(randomItem);
      return;
    }

    this.handleAddItem({
      currentTarget: {
        dataset: {
          id: randomItem._id
        }
      }
    });

    wx.showToast({
      title: `${randomItem.name} 已偷偷加入`,
      icon: 'none'
    });
  },

  handleRemarkInput(event) {
    this.setData({
      remark: event.detail.value || ''
    });
  },

  handleToggleCart() {
    if (!this.data.cartCount) {
      return;
    }

    this.setData({
      cartVisible: !this.data.cartVisible
    });
  },

  handleCloseCart() {
    this.setData({
      cartVisible: false
    });
  },

  handleClearCart() {
    if (!this.data.cartCount) {
      return;
    }

    wx.showModal({
      title: '清空购物车',
      content: '这份快乐先全部放回菜单里吗？',
      confirmColor: '#ff5f9d',
      success: (res) => {
        if (res.confirm) {
          this.refreshCart({});
        }
      }
    });
  },

  async handleSubmitOrder() {
    if (this.data.submitting) {
      return;
    }

    if (!this.data.cartCount) {
      wx.showToast({
        title: '先加一点想吃的吧',
        icon: 'none'
      });
      return;
    }

    const app = getApp();
    const userProfile = app.globalData.userProfile;
    const items = this.data.cartItems.map((item) => ({
      itemId: item.itemId,
      categoryId: item.categoryId,
      name: item.name,
      price: item.price,
      count: item.count,
      image: item.image,
      selectedSpecs: item.selectedSpecs || [],
      specSummary: item.specSummary || ''
    }));

    try {
      this.setData({ submitting: true });

      const result = await createOrder({
        userId: userProfile.id,
        userName: userProfile.nickName,
        items,
        totalPrice: Number(this.data.cartTotalPrice),
        remark: this.data.remark.trim()
      });

      if (!result || result.success === false) {
        throw new Error((result && result.message) || '订单创建失败');
      }

      this.refreshCart({});
      this.setData({
        remark: '',
        cartVisible: false
      });

      wx.showToast({
        title: '订单已经飞去云端啦',
        icon: 'none'
      });

      setTimeout(() => {
        wx.switchTab({
          url: '/pages/orders/index'
        });
      }, 500);
    } catch (error) {
      wx.showToast({
        title: error.message || '提交失败，请稍后再试',
        icon: 'none'
      });
    } finally {
      this.setData({ submitting: false });
    }
  }
});

function getSortTime(value) {
  if (!value) {
    return 0;
  }

  if (typeof value === 'number') {
    return value;
  }

  return new Date(value).getTime() || 0;
}
