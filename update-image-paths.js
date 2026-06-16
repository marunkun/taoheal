const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'content', 'articles');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

let count = 0;
for (const filename of files) {
  const filePath = path.join(dir, filename);
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('/content/articles/images/')) {
    content = content.replace(/\/content\/articles\/images\//g, '/images/');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${filename}`);
    count++;
  }
}

console.log(`\n已更新 ${count} 个文件的图片路径`);
