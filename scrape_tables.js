const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const seeds = [15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
  let grandTotal = 0;

  for (const seed of seeds) {
    await page.goto(`https://sanand0.github.io/tdsdata/js%5Ftable/?seed=${seed}`);
    await page.waitForSelector('table'); // Wait for dynamic content
    const cellValues = await page.$$eval('td', cells => cells.map(td => td.innerText.trim()));
    for (const value of cellValues) {
      const num = parseFloat(value);
      if (!isNaN(num)) grandTotal += num;
    }
  }
  console.log("-----------------------------------------");
  console.log(`FINAL TOTAL SUM: ${grandTotal}`);
  console.log("-----------------------------------------");
  await browser.close();
})();
