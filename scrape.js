const puppeteer = require('puppeteer');

let scrape = async () => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    await page.goto('http://books.toscrape.com/', {waitUntil: ['domcontentloaded', 'networkidle0']});
    // await page.click('#default > div > div > div > div > section > div:nth-child(2) > ol > li:nth-child(1) > article > div.image_container > a > img');
    // await page.waitFor(1000);

    const result = await page.evaluate(() => {
        let elements = document.querySelectorAll('.product_pod');
        let arr = [];
        for (var element of elements) { 
            let title = element.querySelector('h3').innerText;
            let price = element.querySelector('.price_color').innerText;
            arr.push({title, price});
           
        }
        
        return arr;

    });

    browser.close();
    return result;
};

scrape().then((value) => {
    console.log(value); 
});