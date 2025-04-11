import { Loader, UsersIcon } from "lucide-react";
import { useContext, useEffect } from "react";
import { ChatContext } from "../Hooks/useChat";
import ProfileAvatar from "../assets/user(1).png";

function Sidebar() {
  const { GetFriends, friends, isFetchingFriends , GetChat} = useContext(ChatContext);

  useEffect(() => {
    GetFriends();

  }, []);

  return (
    <div className="h-screen w-20 lg:w-60">
      {/* Header */}
      <div className="flex items-center space-x-2 px-3 py-4 border-b border-base-300">
        <UsersIcon className="text-base-content" />
        <h1 className="text-lg font-semibold hidden lg:block text-base-content">Friends</h1>
      </div>

      {/* Friends List with Scroll */}
      <div className="flex flex-col overflow-y-auto max-h-[calc(100vh-80px)] px-3 py-2 space-y-2">
        {isFetchingFriends ? (
          <div className="flex justify-center items-center h-full">
            <Loader className="animate-spin" />
          </div>
        ) : (
          friends?.map((friend  , key) => (
            <button key={key} onClick={()=>{
              GetChat(friend.id)
            }}>
            <div  className="flex items-center space-x-3  rounded hover:bg-base-300 cursor-pointer transition">
              <img src={ProfileAvatar} className="h-10 w-10 rounded-full" alt="Profile" />
              <p className="text-base-content hidden lg:inline text-sm font-medium">{friend.name}</p>
            </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export default Sidebar;
