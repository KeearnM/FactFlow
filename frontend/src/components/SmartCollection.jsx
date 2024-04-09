import React, { useEffect, useState } from "react";
import { useContext } from "react";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";

import { TextField, Box, Button } from "@mui/material";

const SmartCollection = () => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const [newCollection, setNewCollection] = useState("");

  // for testing purposes -- to delete when completed
  console.log(userCtx.smartCollection);
  console.log(userCtx.loggedUserId);
  console.log(newCollection);

  const addNewCollection = async () => {
    const id = userCtx.loggedUserId;
    const res = await fetchData(
      "/api/" + id,
      "PUT",
      { q: newCollection },
      userCtx.accessToken
    );

    if (res.ok) {
      // getCollectionByUserID()
      setNewCollection([]);
      alert(JSON.stringify(`Collection has been added.`));
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  return (
    <>
      <Box display="flex" alignItems="center">
        {/*========== New Collection Input ==========*/}
        <TextField
          style={{ width: "30%" }}
          id="outlined-controlled"
          label="Add New Collection"
          value={newCollection}
          onChange={(event) => {
            setNewCollection(event.target.value);
          }}
        />
        <Button
          style={{ marginLeft: 5, height: "54px", backgroundColor: "black" }}
          size="large"
          variant="contained"
          onClick={addNewCollection}
        >
          Add
        </Button>
      </Box>
    </>
  );
};

export default SmartCollection;
