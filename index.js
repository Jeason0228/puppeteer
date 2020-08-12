const fs = require('fs');
const puppeteer = require('puppeteer');

const main = async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(`https://bck.hermes.com/product-page?locale=ca_en&productsku=H073597CC37`);
    // await page.goto('https://ca.louisvuitton.com/eng-ca/products/nano-speedy-monogram-010575');

    await page.screenshot({ path: 'example.png' });

    await page.on('response', async (response) => {   
        if (response.url() == "https://bck.hermes.com/product-page?locale=ca_en&productsku=H073597CC37"){
            console.log('XHR response received');
            const {hasStock} = await response.json(); 
            console.log('hasStock', hasStock); 
        } 
        browser.close();
    }); 

    await page.reload();


    // await browser.close();
    // setTimeout(() => {
    //     browser.close();
    // }, 1500000);
};



main();