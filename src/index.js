const express = require('express')
const app = express()
const cors = require('cors')
const ppt = require('./fun/ppt')
const { execSync } = require('child_process')
const { fetch } = require('cross-fetch')
const path = require('path')

const PORT = 3009

var page;
var browser;

// app.use(express.static(path.join(__dirname, "./public")))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
    const url = execSync('hostname').toString().trim() === "bips-MacBook-Air.local"? "http://localhost:3009": "https://surya-ai.wibudev.com"

    // Render halaman HTML dan kirimkan data JSON
    res.render('index', { "url": url });
});


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

app.get("/screenshot", async (req, res) => {
    await ppt(page, browser, "screenshot")
    res.sendFile(path.join(__dirname, "./ast/screenshot.png"))
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