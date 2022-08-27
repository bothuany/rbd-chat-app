import { createContext, useState, useContext } from "react";

const NotificationsContext = createContext();

const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const values = { notifications, setNotifications };
  return (
    <NotificationsContext.Provider value={values}>
      {children}
    </NotificationsContext.Provider>
  );
};

const useNotifications = () => useContext(NotificationsContext);

export { useNotifications, NotificationsProvider };
