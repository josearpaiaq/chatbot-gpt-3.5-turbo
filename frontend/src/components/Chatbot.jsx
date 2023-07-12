import { useEffect, useRef, useState } from 'react'
import ChatBubble from './ChatBubble';

export default function Chatbot(props) {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // scroll to bottom when a new chat arrives
  const bottomRef = useRef(null);
  useEffect(() => scrollToBottom(), [isTyping]);
  const scrollToBottom = () => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }) };

  // handle featching chats from openai
  const chat = async (e, message) => {
    e.preventDefault();
    if (!message) return;
    
    setIsTyping(true);
    let chatHistory = chats;
    chatHistory.push({ role: "user", content: message });
    setChats(chatHistory);
    setMessage("");

    const { VITE_API_URL: api_url } = import.meta.env

    try {
      const res = await fetch(api_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chatHistory }),
      })
      const json = await res.json();
      chatHistory.push(json.output);
      setChats(chatHistory);
    } catch (error) {
      console.log(error);
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <div 
      className='
        flex 
        flex-col 
        justify-between
      '
    >
      <div 
        className='
          flex
          flex-col
          overscroll-contain
        '
      >
        {chats.map(({role, content}, i) => (
            <ChatBubble
              key={i}
              role={role}
              content={content}
            /> 
          ))}
          <div ref={bottomRef}></div>
      </div>

      <form
        className='mt-2 sticky bottom-0 left-0 right-0'
        onSubmit={(e) => chat(e, message)}
      >
        <div className='italic my-1'>{isTyping ? "Typing..." : ""}</div>
        <input
          type="text"
          name="message"
          value={message}
          className='
            w-full 
            p-2
            rounded-t-lg 
            bg-teal-950
            text-zinc-300 placeholder:text-zinc-300 
            focus:outline-none
          '
          placeholder="Escribe tu consulta y presiona enter..."
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </div>
  )
}
