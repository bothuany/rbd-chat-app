import { createContext, useState, useContext, useEffect } from "react";
import { useUser } from "./UserContext";
import axios from "axios";
const ChatsContext = createContext();

const ChatsProvider = ({ children }) => {
  const { user } = useUser();
  const [chats, setChats] = useState([]);

  const fetchChats = async () => {
    try {
      if (!user) return;
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, [chats.length, user]);

  const values = { chats, setChats, fetchChats };
  return (
    <ChatsContext.Provider value={values}>{children}</ChatsContext.Provider>
  );
};

const useChats = () => useContext(ChatsContext);

export { useChats, ChatsProvider };
