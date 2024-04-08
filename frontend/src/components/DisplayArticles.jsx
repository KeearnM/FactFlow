/*=============================================================================
 | Purpose:  EXPLAIN WHAT THIS FUNCTION DOES TO SUPPORT THE CORRECT
 |           OPERATION OF THE PROGRAM, AND HOW IT DOES IT.
 |
 | Input / Parameters:  DESCRIBE THE INPUT IT REQUIRES.
 |   
 | Output / Returns:  DESCRIBE THE OUTPUT IT PRODUCES.
 |
 *===========================================================================*/

import React, { useEffect, useState } from "react";
import useGetArticles from "/src/hooks/useGetArticles";
import FormatDate from "/src/utils/FormatDate";
import "/src/components/Display.css";
import { useLocation } from "react-router-dom";

// importing icons from MUI Icons
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
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

const DisplayArticles = () => {
  //receive searchParams from sibling component SearchBar utilizing useNavigate and useLocation from react-router-dom
  const location = useLocation();

  //get date 2 weeks ago for the initialSearchParam 'from' value
  const today = new Date();
  const twoWeeksAgo = new Date(today);
  twoWeeksAgo.setDate(today.getDate() - 14);
  const isoDate = twoWeeksAgo.toISOString().split("T")[0];

  const [searchParams, setSearchParams] = useState({});

  //variables to receive results back from useGetArticles
  const [articles, setArticles] = useState([]);
  const [numResults, setNumResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //variable to control the state of the card
  const [expandedMap, setExpandedMap] = useState({});

  //receive searchParams from sibling component SearchBar utilizing useNavigate and useLocation from react-router-dom
  useEffect(() => {
    setSearchParams(location.state?.searchParams || {});
  }, [location.state?.searchParams]);

  //runs as the page opens for the first time

  // useGetArticles(
  //   searchParams,
  //   articles,
  //   setArticles,
  //   numResults,
  //   setNumResults,
  //   isLoading,
  //   setIsLoading,
  //   error,
  //   setError
  // );

  //function to set the expanded <> collapsible when clicked
  const handleExpandClick = (articleId) => {
    setExpandedMap((prevExpandedMap) => ({
      ...prevExpandedMap,
      [articleId]: !prevExpandedMap[articleId],
    }));
  };

  const handleFactCheckClick = () => {
    // CALL FOR FACT CHECK MODAL / LOGIC HERE! @Kee Arn
  };

  // Render your component based on the state values (isLoading)
  if (isLoading) {
    return <div className="loader centered"></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h3 className="text-center">Top Articles</h3>
      <p className="text-center">Found {numResults} Articles</p>

      <Masonry columns={3} spacing={2}>
        {articles.map((article) => (
          <Card
            sx={{ maxWidth: 350, margin: 0.8, borderRadius: 5 }}
            key={article.articleId}
          >
            <CardContent style={{ paddingBottom: 0 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2">
                  <span>
                    <a
                      className="card-title"
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LinkIcon /> {article.source.domain}
                    </a>
                  </span>
                </Typography>
              </div>
            </CardContent>
            <CardHeader
              title={
                <a
                  className="card-title"
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {article.title}
                </a>
              }
              subheader={
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span>
                    <FormatDate updatedAt={article.pubDate} />
                  </span>
                  <span style={{ marginLeft: "1rem" }}>
                    <CalculateSentiment sentimentArr={article.sentiment} />
                  </span>
                </div>
              }
            />
            <CardMedia
              component="img"
              height="194"
              image={article.imageUrl}
              alt="Article Image"
              onError={(e) => {
                e.target.src = "/src/assets/factFlow_404.png"; //if image URL returns 404 just use the stock image instead
              }}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {article.description}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <CardContent>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="body2">
                    <span>
                      {article.authorsByline ? <PersonOutlineIcon /> : null}{" "}
                      {article.authorsByline}
                    </span>
                  </Typography>
                </div>
              </CardContent>
              <ExpandMore
                expand={expandedMap[article.articleId] || false}
                onClick={() => handleExpandClick(article.articleId)}
                aria-expanded={expandedMap[article.articleId] || false}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse
              in={expandedMap[article.articleId] || false}
              timeout="auto"
              unmountOnExit
            >
              <CardContent>
                <Typography paragraph>{article.summary}</Typography>
              </CardContent>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  size="large"
                  variant="contained"
                  onClick={handleFactCheckClick}
                  style={{ marginLeft: 5, backgroundColor: "darkgreen" }}
                >
                  Fact Check
                </Button>
              </div>
            </Collapse>
          </Card>
        ))}
      </Masonry>
    </div>
  );
};

export default DisplayArticles;
