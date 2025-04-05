import Sidebar from "../Components/Sidebar"

function HomePage() {
  return (
    <div className="min-h-screen bg-base-300 rounded-2xl mt-10 max-w-2xl mx-auto">
        <div className="flex w-full p-5">
          <Sidebar/>
          <div className=" space-x-2 px-3 py-4 border-b border-base-300">
            <h1 className="text-lg font-semibold  text-base-content">Chat</h1>
          </div>
        </div>
    </div>
  )
}

export default HomePage