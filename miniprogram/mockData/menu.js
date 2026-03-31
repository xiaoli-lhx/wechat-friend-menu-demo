const { createMenuIllustration } = require('../utils/image');

const categories = [
  {
    _id: 'cat-dessert',
    name: '甜品',
    sort: 1,
    active: true
  },
  {
    _id: 'cat-milk-tea',
    name: '奶茶',
    sort: 2,
    active: true
  },
  {
    _id: 'cat-interaction',
    name: '互动',
    sort: 3,
    active: true
  },
  {
    _id: 'cat-gift',
    name: '礼物',
    sort: 4,
    active: true
  }
];

function createDrinkSpecs(defaultSugar = '正常糖', defaultIce = '少冰') {
  return [
    {
      id: 'sugar',
      name: '糖度',
      defaultValue: defaultSugar,
      options: ['无糖', '三分糖', '五分糖', '正常糖']
    },
    {
      id: 'ice',
      name: '冰度',
      defaultValue: defaultIce,
      options: ['热饮', '去冰', '少冰', '正常冰']
    }
  ];
}

const itemDefs = [
  {
    _id: 'item-dessert-1',
    categoryId: 'cat-dessert',
    name: '今天想吃冰淇淋',
    badgeText: '冰凉派',
    desc: '入口先凉一下，后劲像朋友在你耳边轻声说一句“今天就别太懂事了”。',
    price: 18,
    monthlySales: 0,
    active: true,
    sort: 1,
    art: {
      title: 'Ice Cream',
      bgTop: '#ffe7f1',
      bgBottom: '#fff7fb',
      accent: '#ff73a9',
      accentSoft: '#ffd6e8',
      icon: '🍨',
      deco: 'M40 178c34-26 60-40 92-40 20 0 41 5 68 20v34H40z'
    }
  },
  {
    _id: 'item-dessert-2',
    categoryId: 'cat-dessert',
    name: '草莓云朵小泡芙',
    badgeText: '软绵绵',
    desc: '一咬就塌成甜甜的云，适合在朋友夸你可爱的时候假装不在意地接一句“还行吧”。',
    price: 22,
    monthlySales: 0,
    active: true,
    sort: 2,
    art: {
      title: 'Puff',
      bgTop: '#ffe2ea',
      bgBottom: '#fff9fc',
      accent: '#ff7d9d',
      accentSoft: '#ffe2c8',
      icon: '🧁',
      deco: 'M28 182c22-22 42-34 64-34 24 0 40 6 84 28l24 14v18H28z'
    }
  },
  {
    _id: 'item-dessert-3',
    categoryId: 'cat-dessert',
    name: '熬夜补偿布丁',
    badgeText: '深夜和解',
    desc: '不是鼓励你晚睡，是替昨晚的你争取一点温柔缓刑。',
    price: 16,
    monthlySales: 0,
    active: true,
    sort: 3,
    art: {
      title: 'Pudding',
      bgTop: '#fff0db',
      bgBottom: '#fff9f1',
      accent: '#f3a55d',
      accentSoft: '#ffe3b6',
      icon: '🍮',
      deco: 'M42 176c26-10 44-16 62-16 30 0 52 8 94 26v20H42z'
    }
  },
  {
    _id: 'item-dessert-4',
    categoryId: 'cat-dessert',
    name: '等你开口柠檬塔',
    badgeText: '微酸先手',
    desc: '先给舌尖一点亮亮的酸，再把想说的话从喉咙里轻轻拎出来。',
    price: 20,
    monthlySales: 0,
    active: true,
    sort: 4,
    art: {
      title: 'Lemon Tart',
      bgTop: '#fff6cb',
      bgBottom: '#fffdf1',
      accent: '#e6b53f',
      accentSoft: '#fff0a2',
      icon: '🍋',
      deco: 'M34 182c22-18 44-24 70-24 32 0 58 10 102 28v18H34z'
    }
  },
  {
    _id: 'item-dessert-5',
    categoryId: 'cat-dessert',
    name: '烤布蕾吐司请坐下聊',
    badgeText: '认真谈谈',
    desc: '外面酥一点，里面软一点，适合边切边把那些没来得及讲的心事补完。',
    price: 26,
    monthlySales: 0,
    active: true,
    sort: 5,
    art: {
      title: 'Toast',
      bgTop: '#ffe9cf',
      bgBottom: '#fff8ef',
      accent: '#d98a55',
      accentSoft: '#f7d9b7',
      icon: '🍞',
      deco: 'M28 184c24-16 48-24 76-24 30 0 58 10 104 30v14H28z'
    }
  },
  {
    _id: 'item-milk-tea-1',
    categoryId: 'cat-milk-tea',
    name: '再来一杯晚风奶茶',
    badgeText: '慢慢喝',
    desc: '珍珠是黏人的，茶底是温吞的，像你们散场前还舍不得结束的话题。',
    price: 19,
    monthlySales: 0,
    active: true,
    sort: 1,
    specGroups: createDrinkSpecs('五分糖', '少冰'),
    art: {
      title: 'Milk Tea',
      bgTop: '#fff0de',
      bgBottom: '#fff9f5',
      accent: '#d39160',
      accentSoft: '#f3dfcc',
      icon: '🧋',
      deco: 'M34 178c36-22 64-28 96-20 22 6 38 12 76 30v18H34z'
    }
  },
  {
    _id: 'item-milk-tea-2',
    categoryId: 'cat-milk-tea',
    name: '焦糖心动波波',
    badgeText: '甜口确认',
    desc: '喝第一口就会想把吸管举起来问一句：你要不要也来一口，真的不亏。',
    price: 21,
    monthlySales: 0,
    active: true,
    sort: 2,
    specGroups: createDrinkSpecs('正常糖', '少冰'),
    art: {
      title: 'Caramel',
      bgTop: '#ffe9d1',
      bgBottom: '#fff8ef',
      accent: '#d38a57',
      accentSoft: '#f6d9bc',
      icon: '🥤',
      deco: 'M32 180c24-20 44-28 70-28 30 0 54 10 106 36v16H32z'
    }
  },
  {
    _id: 'item-milk-tea-3',
    categoryId: 'cat-milk-tea',
    name: '桂花小熊拿铁',
    badgeText: '奶香挂件',
    desc: '闻起来像秋天靠近了半步，喝起来像有人给你把情绪轻轻拍平。',
    price: 24,
    monthlySales: 0,
    active: true,
    sort: 3,
    specGroups: createDrinkSpecs('三分糖', '热饮'),
    art: {
      title: 'Latte',
      bgTop: '#f8ede5',
      bgBottom: '#fffaf7',
      accent: '#be8c63',
      accentSoft: '#f4e2d6',
      icon: '☕',
      deco: 'M36 182c30-18 46-24 70-24 28 0 54 8 98 28v16H36z'
    }
  },
  {
    _id: 'item-milk-tea-4',
    categoryId: 'cat-milk-tea',
    name: '我想喝一杯抹茶云顶',
    badgeText: '清醒绿',
    desc: '微苦先到，奶盖后到，像嘴上说“没事”但心里其实很想被哄。',
    price: 23,
    monthlySales: 0,
    active: true,
    sort: 4,
    specGroups: createDrinkSpecs('三分糖', '少冰'),
    art: {
      title: 'Matcha',
      bgTop: '#ebf7df',
      bgBottom: '#f9fff4',
      accent: '#7cab5c',
      accentSoft: '#dff1c9',
      icon: '🍵',
      deco: 'M30 184c28-18 54-26 80-26 32 0 58 10 102 30v16H30z'
    }
  },
  {
    _id: 'item-milk-tea-5',
    categoryId: 'cat-milk-tea',
    name: '杨枝甘露请哄我',
    badgeText: '热带安慰',
    desc: '果香一上来就很会做人，适合心情不稳时让嘴巴先开心一点。',
    price: 25,
    monthlySales: 0,
    active: true,
    sort: 5,
    specGroups: createDrinkSpecs('五分糖', '正常冰'),
    art: {
      title: 'Mango',
      bgTop: '#fff0c9',
      bgBottom: '#fffbf1',
      accent: '#f3b244',
      accentSoft: '#ffe3a6',
      icon: '🥭',
      deco: 'M26 184c24-16 54-24 84-24 30 0 58 10 106 30v14H26z'
    }
  },
  {
    _id: 'item-interaction-1',
    categoryId: 'cat-interaction',
    name: '真心话蘸酱薯条',
    badgeText: '先说一个',
    desc: '每拿一根都要交代一点心情，番茄酱只是给沉默留个台阶。',
    price: 12,
    monthlySales: 0,
    active: true,
    sort: 1,
    art: {
      title: 'Fries',
      bgTop: '#ffe6cf',
      bgBottom: '#fff9f0',
      accent: '#f09a53',
      accentSoft: '#ffd6ac',
      icon: '🍟',
      deco: 'M30 180c20-12 44-18 72-18 24 0 54 10 108 30v14H30z'
    }
  },
  {
    _id: 'item-interaction-2',
    categoryId: 'cat-interaction',
    name: '命运骰子饭团',
    badgeText: '看运气咯',
    desc: '摇到几就做几个夸夸动作，输的人负责把气氛重新点亮。',
    price: 15,
    monthlySales: 0,
    active: true,
    sort: 2,
    art: {
      title: 'Rice Ball',
      bgTop: '#ecf8ff',
      bgBottom: '#f9fdff',
      accent: '#67a9c8',
      accentSoft: '#d9f2ff',
      icon: '🍙',
      deco: 'M26 184c34-20 58-26 90-26 28 0 52 8 98 30v12H26z'
    }
  },
  {
    _id: 'item-interaction-3',
    categoryId: 'cat-interaction',
    name: '夸夸你一次苏打水',
    badgeText: '气泡夸夸机',
    desc: '点它的人要认真夸别人三句，敷衍的话会被气泡当场识破。',
    price: 13,
    monthlySales: 0,
    active: true,
    sort: 3,
    specGroups: createDrinkSpecs('无糖', '正常冰'),
    art: {
      title: 'Soda',
      bgTop: '#e3fbff',
      bgBottom: '#f8feff',
      accent: '#55b7c8',
      accentSoft: '#ccf6ff',
      icon: '🫧',
      deco: 'M28 182c28-24 50-34 78-34 28 0 56 10 106 30v18H28z'
    }
  },
  {
    _id: 'item-interaction-4',
    categoryId: 'cat-interaction',
    name: '今晚谁先开口拼盘',
    badgeText: '破冰第一名',
    desc: '拼盘里没有正确答案，只有谁先把场子从“嗯嗯”推进到“哈哈哈哈”。',
    price: 18,
    monthlySales: 0,
    active: true,
    sort: 4,
    art: {
      title: 'Platter',
      bgTop: '#ffe7db',
      bgBottom: '#fff9f5',
      accent: '#ef8b7a',
      accentSoft: '#ffd2ca',
      icon: '🍽',
      deco: 'M34 182c30-14 52-20 82-20 32 0 58 8 100 26v18H34z'
    }
  },
  {
    _id: 'item-interaction-5',
    categoryId: 'cat-interaction',
    name: '心情签语气泡杯',
    badgeText: '抽一张吧',
    desc: '喝之前先抽一句心情签，喝完再决定今天是走可爱路线还是嘴硬路线。',
    price: 16,
    monthlySales: 0,
    active: true,
    sort: 5,
    specGroups: createDrinkSpecs('三分糖', '少冰'),
    art: {
      title: 'Fortune',
      bgTop: '#e8f1ff',
      bgBottom: '#fbfdff',
      accent: '#6d93d8',
      accentSoft: '#d6e4ff',
      icon: '🧾',
      deco: 'M32 180c22-18 46-26 74-26 34 0 58 10 104 30v16H32z'
    }
  },
  {
    _id: 'item-gift-1',
    categoryId: 'cat-gift',
    name: '请你收下这颗小星星',
    badgeText: '偏爱发放',
    desc: '适合送给今天状态很棒，或者只是想被偏爱一下的朋友。',
    price: 9,
    monthlySales: 0,
    active: true,
    sort: 1,
    art: {
      title: 'Star',
      bgTop: '#fff7c8',
      bgBottom: '#fffdf0',
      accent: '#edb94f',
      accentSoft: '#fff0a9',
      icon: '⭐',
      deco: 'M22 184c30-18 58-24 92-24 28 0 54 10 104 28v16H22z'
    }
  },
  {
    _id: 'item-gift-2',
    categoryId: 'cat-gift',
    name: '友情续杯徽章',
    badgeText: '下次还聊',
    desc: '别在散场时才舍不得，这枚徽章的作用是把下次见面往前拖一点。',
    price: 14,
    monthlySales: 0,
    active: true,
    sort: 2,
    art: {
      title: 'Badge',
      bgTop: '#f1ecff',
      bgBottom: '#fbf9ff',
      accent: '#8d7bdb',
      accentSoft: '#e0d8ff',
      icon: '🎖',
      deco: 'M26 182c34-20 58-26 92-26 28 0 54 10 102 30v16H26z'
    }
  },
  {
    _id: 'item-gift-3',
    categoryId: 'cat-gift',
    name: '今天你最可爱礼盒',
    badgeText: '认真偏心',
    desc: '礼盒里没有大场面，只有一句让人会偷偷记住很久的小偏爱。',
    price: 28,
    monthlySales: 0,
    active: true,
    sort: 3,
    art: {
      title: 'Gift',
      bgTop: '#ffe9f4',
      bgBottom: '#fff9fd',
      accent: '#f072a4',
      accentSoft: '#ffd7e9',
      icon: '🎁',
      deco: 'M24 184c26-18 52-26 86-26 34 0 62 10 106 30v14H24z'
    }
  },
  {
    _id: 'item-gift-4',
    categoryId: 'cat-gift',
    name: '迟到也原谅你玫瑰糖',
    badgeText: '和解选手',
    desc: '适合把那些轻微的小别扭揉成一颗糖，再递过去说“好啦，不算数了”。',
    price: 11,
    monthlySales: 0,
    active: true,
    sort: 4,
    art: {
      title: 'Rose Candy',
      bgTop: '#ffe6ef',
      bgBottom: '#fffafd',
      accent: '#df6d9a',
      accentSoft: '#ffd2e2',
      icon: '🌹',
      deco: 'M28 182c28-20 48-26 76-26 30 0 58 10 106 30v16H28z'
    }
  },
  {
    _id: 'item-gift-5',
    categoryId: 'cat-gift',
    name: '陪你发呆明信片',
    badgeText: '安静陪伴',
    desc: '不要求你立刻开心，它的作用只是陪你一起把情绪坐到晚一点。',
    price: 12,
    monthlySales: 0,
    active: true,
    sort: 5,
    art: {
      title: 'Postcard',
      bgTop: '#edf5ff',
      bgBottom: '#fbfdff',
      accent: '#6f9bd9',
      accentSoft: '#dae9ff',
      icon: '💌',
      deco: 'M34 180c22-16 48-24 80-24 32 0 58 10 102 30v16H34z'
    }
  }
];

const items = itemDefs.map((item) => {
  const nextItem = Object.assign({}, item);
  nextItem.image = createMenuIllustration(item.art);
  delete nextItem.art;
  return nextItem;
});

const mockMenuData = {
  categories,
  items
};

module.exports = {
  categories,
  items,
  mockMenuData
};
