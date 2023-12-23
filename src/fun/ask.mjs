/**
 * test.js
 */
import ChatBot from "googlebard-js";
import cok from "./cok.js";

export async function ask(text) {
    console.log("pertanyaan", text)
    const cookie2 = cok()
    const chatbot = new ChatBot(cookie2);

    await chatbot.getAPI();
    const jawaban = await chatbot.ask(text)
    console.log("jawaban", jawaban)
    return jawaban
}

