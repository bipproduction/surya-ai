module.exports = function () {
    const cookies = require('./src/ast/cookie.json')
    const PSIDTS = cookies.find((v) => v.name === "__Secure-1PSIDTS")
    const PSID = cookies.find((v) => v.name === "__Secure-1PSID")
    const ls = [PSID, PSIDTS]
    return ls.map((v) => `${v.name}=${v.value}`).join(";")
}