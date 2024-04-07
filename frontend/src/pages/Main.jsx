import React from "react";
import DisplayStories from "../components/DisplayStories";
import DisplayArticles from "../components/DisplayArticles";
import SearchBar from "../components/SearchBar";

const Main = () => {
  return (
    <div>
      {/* <DisplayStories></DisplayStories> */}
      <SearchBar></SearchBar>
      <DisplayArticles></DisplayArticles>
    </div>
  );
};

export default Main;
