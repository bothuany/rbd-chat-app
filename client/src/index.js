import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import { ChatsProvider } from "./context/ChatsContext";
import { ActiveChatProvider } from "./context/ActiveChatContext";
import { NotificationsProvider } from "./context/NotificationsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.Fragment>
    <ChakraProvider>
      <BrowserRouter>
        <UserProvider>
          <ActiveChatProvider>
            <ChatsProvider>
              <NotificationsProvider>
                <App />
              </NotificationsProvider>
            </ChatsProvider>
          </ActiveChatProvider>
        </UserProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.Fragment>
);
