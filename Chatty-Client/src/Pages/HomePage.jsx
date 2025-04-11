import Sidebar from "../Components/Sidebar"
import ChatBox from "../Components/ChatBox"
function HomePage() {
  return (
    <div className="min-h-screen bg-base-300 rounded-2xl mt-10 max-w-2xl mx-auto">
        <div className="flex h-full w-full p-5">
          <Sidebar/>
          <ChatBox/>
        </div>
    </div>
  )
}

export default HomePage