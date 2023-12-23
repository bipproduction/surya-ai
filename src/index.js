const express = require('express')
const app = express()
const cors = require('cors')
const ppt = require('./fun/ppt')
const { execSync } = require('child_process')
const { fetch } = require('cross-fetch')
const path = require('path')

const PORT = 3005

var page;
var browser;

app.use(express.static(path.join(__dirname, "./public")))
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// app.get('/', (req, res) => {
//     res.sendFile('./public/index.html')
// })


app.get('/start', async (req, res) => {
    res.write("ini ppt")
    res.write(`ppt :  ${(page !== undefined).toString()}`)
    ppt(page, browser, "start").then((p) => {
        page = p.page;
        browser = p.browser
        res.write("ppt init success")
    })
    res.write(`ppt : ${(page !== undefined).toString()}`)
})

app.get("/cmd/:text?", async (req, res) => {
    if (!page) return res.send("start terlebih dahulu")
    const text = req.params.text
    await ppt(page, browser, text)
    return res.send(text)
})

app.get("/ask/:text?", async (req, res) => {
    if (!page) return res.send("start terlebih dahulu")
    const text = req.params.text ?? "apa kabar"
    // await fetch(`http://localhost:${PORT}/cmd/reload`)
    // await fetch(`http://localhost:${PORT}/cmd/save_cookie`)
    const { ask } = await import('./fun/ask.mjs')
    const result = await ask(text)
    res.send(result)
})


app.listen(PORT, async () => {
    console.log("start ppt")
    await start_ppt()
    console.log(`server berjalan di port ${PORT}`)
})

async function start_ppt() {
    const p = await ppt(page, browser, "start")
    page = p.page
    browser = p.browser
    return true
}