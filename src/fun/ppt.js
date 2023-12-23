const puppeteer = require('puppeteer-extra');
const chromium = require('chrome-aws-lambda');
const pluginStealth = require('puppeteer-extra-plugin-stealth')();
puppeteer.use(pluginStealth);
pluginStealth.setMaxListeners = () => { };
const path = require('path')
const fs = require('fs')
const { execSync } = require('child_process')
/**
 * 
 * @param {puppeteer.Page} page 
 * @param {puppeteer.Browser} browser 
 * @param {*} params 
 */
module.exports = async function (page, browser, text) {
    const headless = execSync('hostname').toString().trim() !== "bips-MacBook-Air.local"
    if (!page) {
        browser = await puppeteer.launch({
            args: chromium.args,
            // defaultViewport: chromium.defaultViewport,
            dumpio: process.env.STAGE === 'dev',
            executablePath: await chromium.executablePath,
            headless: headless,
            ignoreHTTPSErrors: true,
            slowMo: 250,
            args: [`--window-size=530,720`],
        })
        const [p] = await browser.pages()
        page = p
        await page.setViewport({ width: 530, height: 720 });
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

        const cookie = JSON.parse(fs.readFileSync(path.join(__dirname, "./../ast/cookie.json")))
        await page.setCookie(...cookie)
        await page.goto('https://bard.google.com/chat')
        console.log(text)
    }


    if (text === "save_cookie") {
        const user_cookie = await page.cookies()
        fs.writeFileSync(path.join(__dirname, "./../ast/cookie.json"), JSON.stringify(user_cookie))
        console.log("cookie saved")
    }

    if (text === "reload") {
        await page.reload()
    }
    return { page, browser }
}   