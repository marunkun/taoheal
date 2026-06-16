const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'content', 'articles');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

const categoryMap = {
  '中医基础理论': { zh: '中医基础理论', en: 'TCM Basic Theory' },
  '体质辨识': { zh: '体质辨识与调理', en: 'Body Constitution' },
  '时令养生': { zh: '时令养生', en: 'Seasonal Wellness' },
  '经络穴位': { zh: '经络穴位保健', en: 'Meridian & Acupoints' },
  '食疗药膳': { zh: '食疗药膳', en: 'Medicinal Diet' },
  '美容养颜': { zh: '中医美容养颜', en: 'TCM Beauty' },
  
  '美容护肤': { zh: '中医美容养颜', en: 'TCM Beauty' },
  '皮肤护理': { zh: '中医美容养颜', en: 'TCM Beauty' },
  '抗衰老': { zh: '中医美容养颜', en: 'TCM Beauty' },
  '美白祛斑': { zh: '中医美容养颜', en: 'TCM Beauty' },
  '面部按摩': { zh: '中医美容养颜', en: 'TCM Beauty' },
  '眼部护理': { zh: '中医美容养颜', en: 'TCM Beauty' },
  '头发健康': { zh: '中医美容养颜', en: 'TCM Beauty' },
  '身体塑形': { zh: '中医美容养颜', en: 'TCM Beauty' },
  '情绪美容': { zh: '中医美容养颜', en: 'TCM Beauty' },
  '五行美容': { zh: '中医美容养颜', en: 'TCM Beauty' },
  '气血美容': { zh: '中医美容养颜', en: 'TCM Beauty' },
  '中药面膜': { zh: '中医美容养颜', en: 'TCM Beauty' },
  
  '脾胃调理': { zh: '食疗药膳', en: 'Medicinal Diet' },
  '脾胃养护': { zh: '食疗药膳', en: 'Medicinal Diet' },
  '饮食养生': { zh: '食疗药膳', en: 'Medicinal Diet' },
  '失眠食疗': { zh: '食疗药膳', en: 'Medicinal Diet' },
  '消化改善': { zh: '食疗药膳', en: 'Medicinal Diet' },
  
  '穴位保健': { zh: '经络穴位保健', en: 'Meridian & Acupoints' },
  '经络养生': { zh: '经络穴位保健', en: 'Meridian & Acupoints' },
  '头痛穴位': { zh: '经络穴位保健', en: 'Meridian & Acupoints' },
  '睡眠穴位': { zh: '经络穴位保健', en: 'Meridian & Acupoints' },
  
  '情志养生': { zh: '体质辨识与调理', en: 'Body Constitution' },
  '压力管理': { zh: '体质辨识与调理', en: 'Body Constitution' },
  '气血调理': { zh: '体质辨识与调理', en: 'Body Constitution' },
  '睡眠健康': { zh: '体质辨识与调理', en: 'Body Constitution' },
  
  '太极养生': { zh: '中医基础理论', en: 'TCM Basic Theory' },
  '子午流注': { zh: '中医基础理论', en: 'TCM Basic Theory' },
  '阴阳五行': { zh: '中医基础理论', en: 'TCM Basic Theory' },
};

const fileCategories = {
  'yin-yang-five-elements.json': '中医基础理论',
  'midnight-noon-flow.json': '中医基础理论',
  'taichi-introduction.json': '中医基础理论',
  
  'nine-body-types.json': '体质辨识与调理',
  'qi-blood-tonification.json': '体质辨识与调理',
  'stress-management-tcm.json': '体质辨识与调理',
  
  'seasonal-wellness-spring.json': '时令养生',
  'summer-wellness.json': '时令养生',
  'autumn-wellness.json': '时令养生',
  'winter-wellness.json': '时令养生',
  
  'essential-acupoints.json': '经络穴位保健',
  'meridian-health.json': '经络穴位保健',
  'sleep-acupoints.json': '经络穴位保健',
  'headache-acupoints.json': '经络穴位保健',
  
  'tcm-diet-fundamentals.json': '食疗药膳',
  'medicinal-diet-introduction.json': '食疗药膳',
  'spleen-stomach-regulation.json': '食疗药膳',
  'digestion-improvement.json': '食疗药膳',
  'insomnia-diet-therapy.json': '食疗药膳',
  
  'tcm-beauty-basics.json': '中医美容养颜',
  'acne-tcm-treatment.json': '中医美容养颜',
  'anti-aging-tcm.json': '中医美容养颜',
  'whitening-spot-removal.json': '中医美容养颜',
  'beauty-skin-care.json': '中医美容养颜',
  'eye-beauty-tcm.json': '中医美容养颜',
  'hair-health-tcm.json': '中医美容养颜',
  'body-shaping-tcm.json': '中医美容养颜',
  'facial-massage-beauty.json': '中医美容养颜',
  'herbal-mask-beauty.json': '中医美容养颜',
  'emotional-beauty.json': '中医美容养颜',
  'five-organs-beauty.json': '中医美容养颜',
  'qi-blood-beauty.json': '中医美容养颜',
};

function fixJsonQuotes(content) {
  const lines = content.split('\n');
  const fixedLines = lines.map(line => {
    if (!line.includes('"text":')) return line;
    
    const match = line.match(/"text":\s*"(.*)"/);
    if (!match) return line;
    
    let textContent = match[1];
    textContent = textContent.replace(/(?<!\\)"/g, '\\"');
    
    const before = line.substring(0, line.indexOf('"text":') + 7);
    const after = line.substring(line.lastIndexOf('"') + 1);
    
    return before + '"' + textContent + '"' + after;
  });
  
  return fixedLines.join('\n');
}

let success = 0;
let failed = 0;

for (const filename of files) {
  const filePath = path.join(dir, filename);
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    content = fixJsonQuotes(content);
    
    let article;
    try {
      article = JSON.parse(content);
    } catch(e) {
      console.log(`  ❌ ${filename}: JSON解析失败 - ${e.message}`);
      failed++;
      continue;
    }
    
    const targetCategory = fileCategories[filename];
    if (targetCategory) {
      article.category = {
        zh: targetCategory,
        en: categoryMap[targetCategory]?.en || targetCategory
      };
    } else {
      console.log(`  ⚠️ ${filename}: 未找到分类映射`);
    }
    
    fs.writeFileSync(filePath, JSON.stringify(article, null, 2), 'utf8');
    console.log(`  ✅ ${filename}: 修复并更新分类`);
    success++;
  } catch(e) {
    console.log(`  ❌ ${filename}: 处理失败 - ${e.message}`);
    failed++;
  }
}

console.log(`\n完成！成功: ${success}, 失败: ${failed}`);

const finalCategories = {};
for (const filename of files) {
  const filePath = path.join(dir, filename);
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const article = JSON.parse(content);
    const cat = article.category?.zh || '未知';
    finalCategories[cat] = (finalCategories[cat] || 0) + 1;
  } catch(e) {
    // skip
  }
}

console.log('\n--- 最终分类统计:');
for (const [cat, count] of Object.entries(finalCategories)) {
  console.log(`  ${cat}: ${count} 篇`);
}
