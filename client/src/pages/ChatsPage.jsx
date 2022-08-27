import React from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import Navbar from "../components/Control/Navbar";
import Chats from "../components/Chat/Chats";
import MessagesWindow from "../components/Chat/MessagesWindow";
import Footer from "../components/Footer";

function ChatsPage() {
  return (
    <Grid
      templateAreas={`"navbar navbar"
                  "chats messages"
                  "footer footer"`}
      gridTemplateRows={"10% 1fr 5%"}
      gridTemplateColumns={"33% 1fr"}
      h="97vh"
      gap="1"
    >
      <GridItem area={"navbar"}>
        <Navbar />
      </GridItem>
      <GridItem pl="2" bg="rgb(26,32,44)" area={"chats"}>
        <Chats />
      </GridItem>
      <GridItem pl="2" bg="rgb(26,32,44)" area={"messages"}>
        <MessagesWindow />
      </GridItem>
      <GridItem pl="2" bg="rgb(26, 32, 44);" area={"footer"}>
        <Footer />
      </GridItem>
    </Grid>
  );
}

export default ChatsPage;
