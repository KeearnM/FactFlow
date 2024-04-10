import React, { useEffect, useState } from "react";
import { useContext } from "react";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import styles from "../components/SmartCollection.module.css";
import { TextField, Box, Button, Grid, InputLabel } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import UpdateCollectionModal from "./UpdateCollectionModal";

const SmartCollection = () => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const [newCollection, setNewCollection] = useState("");
  const [updatedCollection, setUpdatedCollection] = useState("");
  const [showUpdateCollectionModal, setShowUpdateCollectionModal] =
    useState(false);
  const [modalData, setModalData] = useState([]);

  // for testing purposes -- to delete when completed
  // console.log(userCtx.smartCollection);
  // console.log(userCtx.loggedUserId);
  // console.log(newCollection);

  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  // Control card expansion for Advanced Search Options
  const [expanded, setExpanded] = useState(false);

  // handle Edit Collection Expand click
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // get smart collection for the specific logged-in user
  const getCollectionByUserID = async () => {
    const id = userCtx.loggedUserId;
    const res = await fetchData(
      "/api/" + id,
      "GET",
      undefined,
      userCtx.accessToken
    );

    if (res.ok) {
      userCtx.setSmartCollection(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  // add new collection to the specific logged-in user
  const addNewCollection = async () => {
    const id = userCtx.loggedUserId;
    const res = await fetchData(
      "/api/" + id,
      "PUT",
      { q: newCollection },
      userCtx.accessToken
    );

    if (res.ok) {
      getCollectionByUserID();
      setNewCollection([]);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  // delete an existing collection from the specific logged-in user
  const deleteCollection = async (id) => {
    const res = await fetchData(
      "/api/" + id,
      "DELETE",
      undefined,
      userCtx.accessToken
    );

    if (res.ok) {
      getCollectionByUserID();
      setNewCollection([]);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  return (
    <>
      <CardHeader
        titleTypographyProps={{
          fontSize: 36,
          fontWeight: 700,
          color: "#0db38e",
        }}
        subheaderTypographyProps={{
          fontSize: 18,
          fontWeight: 700,
        }}
        title="STORIES FOR YOU"
        subheader="A PERSONALISED NEWS FEED BASED ON YOUR INTEREST"
      />
      <InputLabel style={{ marginLeft: 14, fontSize: "14px" }}>
        <strong>What are Stories? </strong>
        <br /> A Story is a cluster of individual articles covering the same
        event or topic.
        <br /> Think of it like a summary obtained from multiple news sources.
        <br /> The cluster size simply indicates how widely reported that topic
        is.
        <br />
        <br />
        Add a topic into your collection and get bite-sized content at your
        fingertips.
        <br />
      </InputLabel>

      <Box display="flex" alignItems="center">
        {/*========== New Collection Input ==========*/}
        <TextField
          style={{ width: "50%", marginLeft: 14 }}
          id="outlined-controlled"
          label="Add New Topic"
          value={newCollection}
          onChange={(event) => {
            setNewCollection(event.target.value);
          }}
        />
        {/*========== Add Button ==========*/}
        <Button
          style={{ marginLeft: 5, height: "54px", backgroundColor: "#0db38e" }}
          size="large"
          variant="contained"
          onClick={addNewCollection}
        >
          Add
        </Button>
      </Box>
      <CardActions style={{ marginLeft: 8 }}>
        <small>Edit Collection</small>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreOutlinedIcon />
        </ExpandMore>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6}>
            {userCtx.smartCollection.map((item) => {
              // console.log(userCtx.smartCollection);

              return (
                <>
                  <label className="col-md-3">{item.q}</label>
                  <Button
                    value={item._id}
                    className="col-md-2"
                    variant="contained"
                    style={{
                      marginLeft: 5,
                      height: "28px",
                      backgroundColor: "#1976D2",
                    }}
                    onClick={() => {
                      setModalData(item);
                      setShowUpdateCollectionModal(true);
                    }}
                  >
                    Update
                  </Button>
                  <Button
                    value={item._id}
                    className="col-md-2"
                    variant="contained"
                    style={{
                      marginLeft: 5,
                      height: "28px",
                      backgroundColor: "black",
                    }}
                    onClick={(event) => {
                      deleteCollection(event.target.value);
                    }}
                  >
                    Delete
                  </Button>
                  <br />
                </>
              );
            })}

            {showUpdateCollectionModal && (
              <UpdateCollectionModal
                modalData={modalData}
                updatedCollection={updatedCollection}
                setUpdatedCollection={setUpdatedCollection}
                getCollectionByUserID={getCollectionByUserID}
                setShowUpdateCollectionModal={setShowUpdateCollectionModal}
              />
            )}
          </Grid>
        </Grid>
      </Collapse>
    </>
  );
};

export default SmartCollection;
