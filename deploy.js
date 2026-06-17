const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

async function main() {
  const indexPath = path.join('.open-next', 'assets', 'index.html');
  let content = fs.readFileSync(indexPath, 'utf-8');
  
  content = content.replace(/(<title>)/, `$1DaoHeal ${Date.now()} - `);
  
  fs.writeFileSync(indexPath, content);
  
  console.log('Modified index.html with timestamp');
  
  execSync('npx wrangler pages deploy .open-next/assets --project-name=daoheal --branch=master', { stdio: 'inherit' });
}

main().catch(console.error);