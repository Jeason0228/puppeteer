const puppeteer = require("puppeteer");

// device list: https://github.com/puppeteer/puppeteer/blob/main/src/common/DeviceDescriptors.ts
// const iPhone = puppeteer.devices["iPhone 6"];

const main = async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      args: [`--window-size=${1600},${1200}`],
    });

    const page = await browser.newPage();

    await page.setViewport({ width: 1600, height: 1200 });

    // emulate device
    // await page.emulate(iPhone);

    /**
     * GO TO THE PAGE
     */
    await page.goto(
      `https://www.bestbuy.ca/en-ca/product/nintendo-switch-console-with-neon-red-blue-joy-con/13817625`
    );

    /**
     * Security bug on Bestbuy website
     * clear all cookies to bypass
     */
    const client = await page.target().createCDPSession();
    await client.send("Network.clearBrowserCookies");

    /**
     * Click the "Add To Cart"
     */
    await page.waitForSelector(".addToCartButton_1op0t");
    await page.click(".addToCartButton_1op0t");

    // wait for page load
    await page.waitForTimeout(10000);

    /**
     * Click the "Go To Cart"
     */
    await page.waitForSelector(".goToCartButton_Co1Sx");
    await page.click(".goToCartButton_Co1Sx");

    // wait for page load
    await page.waitForTimeout(10000);

    /**
     * Click the "Continue To Checkout"
     */
    const checkouts = await page.$$(".continueToCheckout_3Dgpe");
    await checkouts[1].click();

    /**
     * Click the "Continue" (continue as guest)
     */
    await page.waitForSelector(".guest-continue-link");
    await page.click(".guest-continue-link");

    // wait for page load
    await page.waitForTimeout(10000);

    /**
     * Fill shipping details
     */
    await page.focus("#email");
    await page.keyboard.type("che@soundhound.com");

    await page.focus("#firstName");
    await page.keyboard.type("Cris");

    await page.focus("#lastName");
    await page.keyboard.type("He");

    await page.focus("#addressLine");
    await page.keyboard.type("180 Enterprise Blvd");

    await page.focus("#city");
    await page.keyboard.type("Unionville");

    await page.focus("#postalCode");
    await page.keyboard.type("L6G0G4");

    await page.focus("#phone");
    await page.keyboard.type("6476760999");

    /**
     * Click the "Continue To Payment"
     */
    await page.waitForSelector(".continue-to-payment");
    await page.click(".continue-to-payment");

    // wait for page load
    await page.waitForTimeout(10000);

    /**
     * Fill payment details
     */
    await page.focus("#shownCardNumber");
    await page.keyboard.type("4242424242424242");

    await page.select("#expirationMonth", "4");
    await page.select("#expirationYear", "2022");

    await page.focus("#cvv");
    await page.keyboard.type("123");

    /**
     * Click the "Continue To Review"
     */
    await page.waitForSelector(".continue-to-review ");
    await page.click(".continue-to-review");

    // wait for page load
    await page.waitForTimeout(10000);

    /**
     * Click the "Place Order"
     */
    await page.waitForSelector(".order-now");
    await page.click(".order-now");

    /**
     * Wait for the final result
     */
    await page.waitForTimeout(10000);

    // check payment status
    const errorComponent = await page.$$(".errorComponent");
    if (Array.isArray(errorComponent) && errorComponent.length > 0) {
      console.log("unsuccessful payment");
    }

    // check payment status
    const errorModal = await page.$$("#errorModal");
    if (Array.isArray(errorModal) && errorModal.length > 0) {
      console.log("unsuccessful payment");
    }

    /**
     * Screenshot
     */
    await page.screenshot({ path: "payment.png" });

    await browser.close();
  } catch (error) {
    console.log("expected error");
  }
};

main();
