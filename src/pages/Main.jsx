import React from "react";
import DisplayStories from "../components/DisplayStories";
import DisplayArticles from "../components/DisplayArticles";

const Main = () => {
  return (
    <div>
      <h1 className="centered">factFLow</h1>
      {/* <DisplayStories></DisplayStories> */}
      <DisplayArticles></DisplayArticles>
    </div>
  );
};

export default Main;
