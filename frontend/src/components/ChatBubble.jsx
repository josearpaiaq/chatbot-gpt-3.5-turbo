export default function ChatBubble({ content, role }) { 
  return (
    <div 
      className={`
        rounded
        p-2
        pe-4
        my-1
        min-w-[30%]
        max-w-[80%]
        text-black
        ${role === 'user' ? 'self-end text-end bg-purple-200': 'self-start bg-purple-400'}
      `}
    >
      <p 
        className='font-bold'
      >
        {role === 'user' ? 'You' : 'Belleza Online'}
      </p> 
      {content}
    </div>
  )
}
