/**
 * test.js
 */
import ChatBot from "googlebard-js";
import cok from "./cok.js";

export async function ask(text) {
    const cookie2 = cok()
    const chatbot = new ChatBot(cookie2);

    await chatbot.getAPI();

    return await chatbot.ask(text)
}

