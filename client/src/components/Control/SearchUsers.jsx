import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import SearchUser from "./SearchUser";
import { useUser } from "../../context/UserContext";
import axios from "axios";

function SearchUsers({ keyword }) {
  const [users, setUsers] = useState([]);
  const { user } = useUser();
  const getUsers = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${keyword}`, config);
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsers();
  }, [keyword]);

  return (
    <Box>
      {users.length > 0 &&
        users.map((user, index) => (
          <SearchUser key={index} name={user.username} id={user._id} />
        ))}
      {users.length === 0 && <Text>User Not Found!</Text>}
    </Box>
  );
}

export default SearchUsers;
