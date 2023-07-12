import Chatbot from "./components/Chatbot"

function App() {
  return (
    <div 
      className="
        min-h-screen p-2 
        flex flex-col justify-between 
        bg-teal-950
        text-zinc-300
      "
    >
      <div className="w-full text-center sticky top-0 left-0 right-0 bg-teal-950 rounded-b-lg">
        <p className="font-bold text-3xl">Belleza Online</p>
        <p className="text-sm">
          Somos tu mejor elección en cuanto a belleza online
        </p>
      </div>
      <Chatbot />
    </div>
  )
}

export default App
