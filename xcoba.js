const ppt = require("./src/fun/ppt");
const cookie = require('./src/ast/cookie.json')
const {execSync} = require('child_process')


;(async () => {
    const headless = execSync('hostname').toString().trim() !== "bips-MacBook-Air.local"
    console.log(headless)
})()