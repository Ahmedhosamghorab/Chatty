import { createContext, useState } from "react";
import { axiosInstance } from "../Utils/Axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
export const ChatContext = createContext();
export const useChat = () => {
  const [friends, setfriends] = useState();
  const [isFetchingFriends, setIsFetchingFriends] = useState();

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
      toast.error(error.response.data.message);
    }finally{
        setIsFetchingFriends(false)
    }
  };
 
  return {
    friends,
    GetFriends,
    isFetchingFriends
  };
};

export default function ChatProvider({ children }) {
  const auth = useChat();
  return <ChatContext.Provider value={auth}>{children}</ChatContext.Provider>;
}
