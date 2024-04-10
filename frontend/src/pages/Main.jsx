import React from "react";
import DisplayStories from "../components/DisplayStories";
import DisplayArticles from "../components/DisplayArticles";
import SearchBar from "../components/SearchBar";

const Main = () => {
  return (
    <div>
      <SearchBar></SearchBar>
      <DisplayArticles></DisplayArticles>
    </div>
  );
};

export default Main;
