import { Loader, MessageSquare, Send } from "lucide-react"
import { useContext, useState, useRef, useEffect } from "react"
import { ChatContext } from "../Hooks/useChat"
import { AuthContext } from "../Hooks/useAuth"
import moment from "moment"
import toast from "react-hot-toast"

function ChatBox() {
  const { chat, isFetchingChat, SendMessage, friendId } = useContext(ChatContext)
  const { authUser } = useContext(AuthContext)
  const [messageText, setMessageText] = useState("")
  const messagesEndRef = useRef(null)

  const handleSend = () => {
    if (messageText.trim() === "") {
      toast.error("Message cannot be empty!")
      return
    }
    SendMessage(friendId, messageText)
    setMessageText("")
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chat])

  return (
    <div className="flex flex-col h-screen w-full max-w-screen-sm mx-auto bg-base-100">
      
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-4 border-b border-base-300 shrink-0">
        <MessageSquare className="text-base-content" />
        <h1 className="text-lg font-semibold text-base-content">Friends</h1>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2 min-h-0">
        {isFetchingChat ? (
          <div className="flex justify-center items-center h-full">
            <Loader className="animate-spin" />
          </div>
        ) : chat && authUser && chat.length > 0 ? (
          chat.map((message) => (
            <div
              key={message.id}
              className={`w-full flex ${message.sender_id === authUser.id ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] px-4 py-2 rounded-lg border border-base-300 ${
                  message.sender_id === authUser.id
                    ? "bg-primary text-white rounded-br-none"
                    : "bg-base-200 text-base-content rounded-bl-none"
                }`}
              >
                <p className="text-sm break-words">{message.content}</p>
                <span className="text-xs text-gray-300 mt-1 block text-right">
                  {moment(message.created_at).format("hh:mm A - DD MMM")}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-base-content">No messages</p>
        )}
        {/* Make sure to scroll to the latest message */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-base-300 px-3 py-2 flex items-center gap-2 shrink-0 bg-base-100">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow p-2 rounded border outline-0 border-base-300 bg-base-200 text-base-content"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend()
          }}
        />
        <button
          onClick={handleSend}
          className="bg-primary text-white p-2 rounded hover:bg-primary/90 transition"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  )
}

export default ChatBox
