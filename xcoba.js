const ppt = require("./src/fun/ppt");
const cookie = require('./src/ast/cookie.json')



;(async () => {
    const {ask} = await import('./src/fun/ask.mjs')
    ask()
})()