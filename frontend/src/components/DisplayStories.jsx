import React from "react";
import useGetStories from "/src/hooks/useGetStories";
import FormatDate from "/src/utils/FormatDate";
import "/src/components/Display.css";

const DisplayStories = () => {
  const { stories, numResults, isLoading, error } = useGetStories();

  // Render your component based on the state values
  if (isLoading) {
    return <div className="loader centered"></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-center">Stories</h2>
      <h3 className="text-center">{numResults} Results</h3>
      <div className="card-container">
        {stories.map((story) => (
          <div className="card" key={story.id}>
            <div className="card-body">
              <div>
                <p>
                  Updated <FormatDate updatedAt={story.updatedAt} />
                </p>
              </div>
              <h5 className="card-title">{story.name}</h5>
              <p className="card-text">{story.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayStories;
