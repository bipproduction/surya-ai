/**
 * test.js
 */
import ChatBot from "googlebard-js";
import cok from "./cok.js";

async function ask() {
    const cookie2 = cok()
    const chatbot = new ChatBot(cookie2);

    await chatbot.getAPI();

    console.log(await chatbot.ask("berikan data lengkap tentang malikkurosaki berikan jawaban dalam bahasa indonesia"));
}
ask()
