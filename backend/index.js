import express from 'express'
import cors from 'cors'
import chatbot from './routes/chatbot.js'
import { Configuration, OpenAIApi } from "openai";
import dotenv from 'dotenv'
dotenv.config()

export const configuration = new Configuration({
  organization: process.env.OPENAI_ORG_KEY,
  apiKey: process.env.OPENAI_API_KEY,
});
export const openai = new OpenAIApi(configuration);

const { PORT } = process.env;
const app = express();

app.use(express.json());
app.use(cors());

// routes
app.use(chatbot)

app.listen(PORT ?? 8001, () => {
  console.log(`Listening on port ${PORT}`)
})