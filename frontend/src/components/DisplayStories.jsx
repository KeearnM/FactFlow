import React, { useState } from "react";
import useGetStories from "/src/hooks/useGetStories";
import FormatDate from "/src/utils/FormatDate";
import "/src/components/Display.css";

// importing icons from MUI Icons
import BlurOnOutlinedIcon from "@mui/icons-material/BlurOnOutlined";
import LinkIcon from "@mui/icons-material/Link";

//importing card related components from MUI
import { styled } from "@mui/material/styles";
import Masonry from "@mui/lab/Masonry";
import {
  Typography,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CalculateSentiment from "../utils/CalculateSentiment";
import Button from "@mui/material/Button";

//Expand card logic
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

const DisplayStories = () => {
  const { stories, numResults, isLoading, error } = useGetStories();
  //variable to control the state of the card
  const [expandedMap, setExpandedMap] = useState({});

  //function to set the expanded <> collapsible when clicked
  const handleExpandClick = (articleId) => {
    setExpandedMap((prevExpandedMap) => ({
      ...prevExpandedMap,
      [articleId]: !prevExpandedMap[articleId],
    }));
  };

  // Render your component based on the state values
  if (isLoading) {
    return <div className="loader centered"></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h3 className="text-center">Top Stories</h3>
      <p className="text-center">Found {numResults} Stories</p>

      <Masonry columns={3} spacing={2}>
        {stories.map((story) => (
          <Card
            sx={{ maxWidth: 350, margin: 0.8, borderRadius: 5 }}
            key={story.id}
          >
            <CardHeader
              title={story.name}
              subheader={
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span>
                    <FormatDate updatedAt={story.createdAt} />
                  </span>
                  <span style={{ marginLeft: "1rem" }}>
                    <CalculateSentiment sentimentArr={story.sentiment} />
                  </span>
                </div>
              }
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {story.summary}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <CardContent>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="body2">
                    <span>
                      {story.totalCount ? <BlurOnOutlinedIcon /> : null}{" "}
                      {story.totalCount} unique articles/reprints within the
                      story cluster.
                    </span>
                  </Typography>
                </div>
              </CardContent>
              <ExpandMore
                expand={expandedMap[story.id] || false}
                onClick={() => handleExpandClick(story.id)}
                aria-expanded={expandedMap[story.id] || false}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse
              in={expandedMap[story.id] || false}
              timeout="auto"
              unmountOnExit
            >
              <CardContent>
                <Typography paragraph>
                  <p className="text-center">Key Points:</p>
                  {story.keyPoints.map((keyPoint, index) => (
                    <div key={index}>
                      &#8226; {keyPoint.point}
                      <br />
                    </div>
                  ))}
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        ))}
      </Masonry>
    </div>
  );
};

export default DisplayStories;
