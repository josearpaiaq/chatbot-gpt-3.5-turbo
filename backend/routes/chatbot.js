import { Router } from 'express';
import { knowledgeBase } from "../openai/context.js";
import { openai } from '../index.js';

const router = Router();

router.post('/chatbot', async (req, res) => {
  try {
    const { chatHistory: chats } = req.body;
    if (!chats || !chats.length) res.status(500).json({ role: 'assistant', content: 'Error' })
    const result = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        ...knowledgeBase,
        ...chats
      ],
    })
    res.status(200).json({ output: result.data.choices[0].message })
  } catch (error) {
    console.log(error);
    res.status(500).json({ role: 'assistant', content: error.message })
  }
});

export default router;