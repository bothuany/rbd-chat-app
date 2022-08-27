import { createContext, useState, useContext, useEffect } from "react";
import { useUser } from "./UserContext";
const ActiveChatContext = createContext();

const ActiveChatProvider = ({ children }) => {
  const { user } = useUser();
  const [activeChat, setActiveChat] = useState({ _id: -1 });

  useEffect(() => {
    if (!user) {
      setActiveChat({ _id: -1 });
    }
  }, [user]);
  const values = { activeChat, setActiveChat };
  return (
    <ActiveChatContext.Provider value={values}>
      {children}
    </ActiveChatContext.Provider>
  );
};

const useActiveChat = () => useContext(ActiveChatContext);

export { useActiveChat, ActiveChatProvider };
