const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('Console Error:', msg.text());
    }
  });
  
  page.on('pageerror', err => {
    console.log('Page Error:', err.message);
  });
  
  try {
    await page.goto('http://localhost:3000/zh/knowledge', { waitUntil: 'networkidle' });
    
    const images = await page.locator('img').all();
    console.log(`Found ${images.length} images on the page`);
    
    let loadedCount = 0;
    let failedCount = 0;
    
    for (const img of images.slice(0, 5)) {
      const src = await img.getAttribute('src');
      const naturalWidth = await img.evaluate(el => el.naturalWidth);
      
      if (naturalWidth > 0) {
        console.log(`✅ Image loaded: ${src}`);
        loadedCount++;
      } else {
        console.log(`❌ Image failed to load: ${src}`);
        failedCount++;
      }
    }
    
    console.log(`\nSummary: ${loadedCount} loaded, ${failedCount} failed`);
    
  } catch (err) {
    console.error('Test failed:', err.message);
  } finally {
    await browser.close();
  }
})();
