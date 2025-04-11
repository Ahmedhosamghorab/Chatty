import { createContext, useState } from "react";
import { axiosInstance } from "../Utils/Axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
export const ChatContext = createContext();
export const useChat = () => {
  const [friends, setfriends] = useState();
  const [isFetchingFriends, setIsFetchingFriends] = useState();
  const [chat , setChat] = useState()
  const [isFetchingChat, setisFetchingChat] = useState();
  const [friendId , setFriendId] = useState()
  const GetFriends = async () => {
    setIsFetchingFriends(true)
    try {
           const res = await axiosInstance.get("/friends", {
             headers: {
               Authorization: "Bearer " + Cookies.get("access_token"),
             },
           });
        console.log(res.data)
        setfriends(res.data.friends)
    } catch (error) {
      console.log(error.response)
      toast.error(error.response.data.message);
    }finally{
        setIsFetchingFriends(false)
    }
  };
  const GetChat = async (friend_id) => {
    setisFetchingChat(true)
    setFriendId(friend_id)
    try {
           const res = await axiosInstance.post("/messages",{friend_id} , {
             headers: {
               Authorization: "Bearer " + Cookies.get("access_token"),
             },
           });
        setChat(res.data)
    } catch (error) {
      console.log(error.response)
      toast.error(error.response.data.message);
    }finally{
      setisFetchingChat(false)
    }
  };
  const SendMessage = async (reciver_id , content) => {
    try {
           const res = await axiosInstance.post("/send-message",{reciver_id  , content} , {
             headers: {
               Authorization: "Bearer " + Cookies.get("access_token"),
             },
           });
           return res
    } catch (error) {
      console.log(error)

      toast.error(error.response.data.message);
    }
  };
  return {
    friends,
    GetFriends,
    isFetchingFriends,
    chat,
    isFetchingChat,
    GetChat,
    SendMessage,
    friendId
  };
};

export default function ChatProvider({ children }) {
  const auth = useChat();
  return <ChatContext.Provider value={auth}>{children}</ChatContext.Provider>;
}
