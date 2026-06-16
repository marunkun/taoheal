export const mockCategories = [
  {
    id: 1,
    slug: 'seasonal-wellness',
    name_zh: '时令养生',
    name_en: 'Seasonal Wellness',
    description_zh: '根据四季变化调整养生方案',
    description_en: 'Adjust wellness routines according to seasons',
    icon: '🌸',
    color: 'from-pink-400 to-rose-500',
    post_count: 5,
    actual_post_count: 5,
  },
  {
    id: 2,
    slug: 'body-constitution',
    name_zh: '体质调理',
    name_en: 'Body Constitution',
    description_zh: '了解你的体质类型，进行针对性调理',
    description_en: 'Understand your body type for targeted wellness',
    icon: '🧬',
    color: 'from-blue-400 to-cyan-500',
    post_count: 3,
    actual_post_count: 3,
  },
  {
    id: 3,
    slug: 'herbal-medicine',
    name_zh: '食疗药膳',
    name_en: 'Herbal Diet',
    description_zh: '通过饮食调理身体',
    description_en: 'Nourish your body through diet',
    icon: '🍲',
    color: 'from-amber-400 to-orange-500',
    post_count: 4,
    actual_post_count: 4,
  },
  {
    id: 4,
    slug: 'daily-practices',
    name_zh: '日常养生',
    name_en: 'Daily Practices',
    description_zh: '日常养生习惯和技巧',
    description_en: 'Daily wellness habits and tips',
    icon: '🌿',
    color: 'from-green-400 to-emerald-500',
    post_count: 6,
    actual_post_count: 6,
  },
];

export const mockPosts = [
  {
    id: 'post_1',
    title: '春季养肝的最佳方法',
    content: '春天是养肝的好时节。中医认为，春季属木，与肝脏对应。此时应多吃绿色蔬菜，如菠菜、芹菜、西兰花等。同时，保持心情舒畅对养肝也非常重要。\n\n建议每天早晨起床后进行15分钟的深呼吸练习，有助于肝气的疏泄。此外，适当的运动如散步、太极拳也是很好的选择。',
    author_id: 'user_springlover',
    author_name: '养生达人',
    author_image: null,
    category_id: 1,
    category_name_zh: '时令养生',
    category_name_en: 'Seasonal Wellness',
    category_icon: '🌸',
    view_count: 128,
    like_count: 24,
    is_pinned: false,
    created_at: '2024-03-15T10:30:00Z',
    updated_at: '2024-03-15T10:30:00Z',
  },
  {
    id: 'post_2',
    title: '痰湿体质的调理方案',
    content: '痰湿体质的人通常体型偏胖，容易感到身体沉重、胸闷腹胀。调理重点在于健脾祛湿。\n\n推荐食物：薏米、红豆、冬瓜、山药、白萝卜等。\n\n建议少吃生冷、油腻、甜食，这些食物会加重体内湿气。适当进行有氧运动，如快走、慢跑，有助于排出湿气。',
    author_id: 'user_tcmexpert',
    author_name: '中医爱好者',
    author_image: null,
    category_id: 2,
    category_name_zh: '体质调理',
    category_name_en: 'Body Constitution',
    category_icon: '🧬',
    view_count: 256,
    like_count: 45,
    is_pinned: true,
    created_at: '2024-03-10T14:20:00Z',
    updated_at: '2024-03-10T14:20:00Z',
  },
  {
    id: 'post_3',
    title: '当归生姜羊肉汤的做法',
    content: '当归生姜羊肉汤是经典的温补药膳，特别适合冬季食用。\n\n材料：\n- 羊肉500克\n- 当归20克\n- 生姜30克\n- 料酒、盐适量\n\n做法：\n1. 羊肉焯水去血沫\n2. 所有材料放入锅中，加水煮沸\n3. 转小火慢炖2小时\n4. 加盐调味即可\n\n这道汤具有温中补虚、散寒止痛的功效。',
    author_id: 'user_cookmaster',
    author_name: '美食养生',
    author_image: null,
    category_id: 3,
    category_name_zh: '食疗药膳',
    category_name_en: 'Herbal Diet',
    category_icon: '🍲',
    view_count: 312,
    like_count: 67,
    is_pinned: false,
    created_at: '2024-03-08T09:15:00Z',
    updated_at: '2024-03-08T09:15:00Z',
  },
  {
    id: 'post_4',
    title: '上班族的办公室养生技巧',
    content: '长时间坐在办公室容易导致颈椎、腰椎问题。以下是一些简单的办公室养生技巧：\n\n1. 每隔一小时站起来活动5分钟\n2. 调整坐姿，保持背部挺直\n3. 做简单的颈部拉伸运动\n4. 多喝水，保持身体水分\n5. 中午适当午睡15-20分钟\n\n这些小习惯可以有效缓解工作压力，保护身体健康。',
    author_id: 'user_officeworker',
    author_name: '职场养生',
    author_image: null,
    category_id: 4,
    category_name_zh: '日常养生',
    category_name_en: 'Daily Practices',
    category_icon: '🌿',
    view_count: 423,
    like_count: 89,
    is_pinned: false,
    created_at: '2024-03-05T16:45:00Z',
    updated_at: '2024-03-05T16:45:00Z',
  },
];

export const mockComments: Record<string, Array<{
  id: string;
  content: string;
  author_name: string;
  author_image: string | null;
  created_at: string;
  parent_id: string | null;
}>> = {
  post_1: [
    {
      id: 'comment_1_1',
      content: '非常实用的建议！已经开始尝试了。',
      author_name: '初学者',
      author_image: null,
      created_at: '2024-03-15T11:00:00Z',
      parent_id: null,
    },
    {
      id: 'comment_1_2',
      content: '请问还有其他养肝的食物推荐吗？',
      author_name: '健康追求者',
      author_image: null,
      created_at: '2024-03-15T12:30:00Z',
      parent_id: null,
    },
  ],
  post_2: [
    {
      id: 'comment_2_1',
      content: '我也是痰湿体质，感觉这些建议很有用！',
      author_name: '同体质',
      author_image: null,
      created_at: '2024-03-10T15:00:00Z',
      parent_id: null,
    },
  ],
  post_3: [
    {
      id: 'comment_3_1',
      content: '冬天喝这个汤太舒服了！',
      author_name: '美食家',
      author_image: null,
      created_at: '2024-03-08T10:00:00Z',
      parent_id: null,
    },
    {
      id: 'comment_3_2',
      content: '可以加枸杞一起炖吗？',
      author_name: '养生新手',
      author_image: null,
      created_at: '2024-03-08T11:30:00Z',
      parent_id: null,
    },
    {
      id: 'comment_3_3',
      content: '当然可以，枸杞有滋补肝肾的作用，很搭配！',
      author_name: '食疗专家',
      author_image: null,
      created_at: '2024-03-08T12:00:00Z',
      parent_id: 'comment_3_2',
    },
  ],
};

let postIdCounter = 5;
let commentIdCounter = 10;

export function createMockPost(data: {
  title: string;
  content: string;
  categoryId: string | null;
  authorId: string;
  authorName: string;
  authorImage: string | null;
}) {
  const newPost = {
    id: `post_${postIdCounter++}`,
    title: data.title,
    content: data.content,
    author_id: data.authorId,
    author_name: data.authorName,
    author_image: null as null,
    category_id: (data.categoryId ? parseInt(data.categoryId) : 0) as number,
    category_name_zh: data.categoryId 
      ? mockCategories.find(c => c.id === parseInt(data.categoryId || '0'))?.name_zh || ''
      : '',
    category_name_en: data.categoryId
      ? mockCategories.find(c => c.id === parseInt(data.categoryId || '0'))?.name_en || ''
      : '',
    category_icon: data.categoryId
      ? mockCategories.find(c => c.id === parseInt(data.categoryId || '0'))?.icon || ''
      : '',
    view_count: 0,
    like_count: 0,
    is_pinned: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  mockPosts.push(newPost);
  return newPost;
}

export function createMockComment(data: {
  postId: string;
  content: string;
  authorId: string;
  authorName: string;
  authorImage: string | null;
  parentId: string | null;
}) {
  const newComment = {
    id: `comment_${commentIdCounter++}`,
    content: data.content,
    author_name: data.authorName,
    author_image: data.authorImage,
    created_at: new Date().toISOString(),
    parent_id: data.parentId,
  };
  if (!mockComments[data.postId]) {
    mockComments[data.postId] = [];
  }
  mockComments[data.postId].push(newComment);
  return newComment;
}