const puppeteer = require("puppeteer");

// beforeAll((done) => {
//     server.initServer();
// })

// afterAll(done => {
//     server.closeServer();
// })

/**
 * TO RUN TESTS
 * First, open a cli and go to the project root.
 * Type npm run dev to concurrently run the backend and frontend development server
 * open a new cli window
 * type npm test to run the jest tests
 */

test("discover page", async() => {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 30,
        args: ["--window-size=1920,1080"],
    });
    const page = await browser.newPage();
    page.setViewport({ width: 1920, height: 1080 });
    await page.goto("http://localhost:3000");
    await page.click("#loginbtn");
    await new Promise((resolve) => {
        setTimeout(resolve, 1500);
    });
    await page.click("#loginEmail");
    await page.type("#loginEmail", "alexander.nagel21@gmail.com");
    await page.click("#loginPassword");
    await page.type("#loginPassword", "alexnagel");
    await page.click("#loginSubmit");
    await new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
    await page.click("#navbarDiscover");
    await new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
    await page.click(".searchBar");
    await page.type(".searchBar", "nvidia");
    // await new Promise((resolve) => {
    //     setTimeout(resolve, 200);
    // });
    let companies = await page.$$eval(".company-item", (divs) => divs.length);
    console.log(companies);
    expect(companies).toBe(2);
    await page.click(".searchBar");
    await page.keyboard.press("Backspace");
    await page.keyboard.press("Backspace");
    await page.keyboard.press("Backspace");
    await page.keyboard.press("Backspace");
    await page.keyboard.press("Backspace");
    await page.keyboard.press("Backspace");

    await page.click(".donTagsWrapper");
    await page.click(".merch");
    // await new Promise((resolve) => {
    //     setTimeout(resolve, 200);
    // });
    companies = await page.$$eval(".company-item", (divs) => divs.length);
    console.log(companies);
    expect(companies).toBe(3);
    await page.click(".donTag");
    await page.click(".donTagsWrapper");

    await page.click(".locationWrapper");
    await page.click(".fiftyMiles");
    // await new Promise((resolve) => {
    //     setTimeout(resolve, 200);
    // });
    companies = await page.$$eval(".company-item", (divs) => divs.length);
    console.log(companies);
    expect(companies).toBe(1);
    await page.click(".fiftyMiles");

    await page.click(".customDist");
    await page.click(".locTagInput");
    await page.type(".locTagInput", "50");
    await page.keyboard.press("Enter");
    // await new Promise((resolve) => {
    //     setTimeout(resolve, 200);
    // });
    companies = await page.$$eval(".company-item", (divs) => divs.length);
    console.log(companies);
    expect(companies).toBe(1);
    await page.click(".customDist");
    // await new Promise((resolve) => {
    //     setTimeout(resolve, 200);
    // });
    await new Promise((resolve) => {
        setTimeout(resolve, 200);
    });
    companies = await page.$$eval(".company-item", (divs) => divs.length);
    console.log(companies);
    expect(companies).toBe(10);
    await page.click(".companies__see-more");
    await new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
    companies = await page.$$eval(".company-item", (divs) => divs.length);
    console.log(companies);
    expect(companies).toBe(20);
    await page.hover("#navbarDropdown");
    await page.hover("#navbarLogout");
    await page.click("#navbarLogout");
    expect(await page.$eval("#loginbtn", (e) => e.textContent)).toBe("Login");
    await page.click("#loginbtn");
    await new Promise((resolve) => {
        setTimeout(resolve, 1500);
    });
    expect(await page.$eval("#loginSubmit", (e) => e.value)).toBe("Login");
    await browser.close();
}, 100000);
// await page.click("#navbarChat");
// await new Promise((resolve) => {
//     setTimeout(resolve, 1000);
// });
test("posts page", async() => {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 30,
        args: ["--window-size=1920,1080"],
    });
    const page = await browser.newPage();
    page.setViewport({ width: 1920, height: 1080 });
    await page.goto("http://localhost:3000");
    await page.click("#loginbtn");
    await new Promise((resolve) => {
        setTimeout(resolve, 1500);
    });
    await page.click("#loginEmail");
    await page.type("#loginEmail", "alexander.nagel21@gmail.com");
    await page.click("#loginPassword");
    await page.type("#loginPassword", "alexnagel");
    await page.click("#loginSubmit");
    await new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
    await page.click("#navbarPosts");
    await new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
    //posts tests
    await page.hover("#navbarDropdown");
    await page.hover("#navbarLogout");
    await page.click("#navbarLogout");
    expect(await page.$eval("#loginbtn", (e) => e.textContent)).toBe("Login");
    await page.click("#loginbtn");
    await new Promise((resolve) => {
        setTimeout(resolve, 1500);
    });
    expect(await page.$eval("#loginSubmit", (e) => e.value)).toBe("Login");
    await browser.close();
}, 100000);