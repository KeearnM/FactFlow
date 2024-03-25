import React, { useState } from "react";
import useGetArticles from "/src/hooks/useGetArticles";
import FormatDate from "/src/utils/FormatDate";
import "/src/components/Display.css";

const DisplayArticles = () => {
  const { articles, numResults, isLoading, error } = useGetArticles();

  // State to track expanded cards
  const [expandedCards, setExpandedCards] = useState([]);

  const toggleCard = (id) => {
    console.log("Toggling card:", id);
    console.log("Toggling card:", toggleCard);
    if (expandedCards.includes(id)) {
      setExpandedCards(expandedCards.filter((cardId) => cardId !== id));
    } else {
      setExpandedCards([...expandedCards, id]);
    }
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
      <h2 className="text-center">Articles</h2>
      <h3 className="text-center">{numResults} Results</h3>
      <div className="card-container">
        {articles.map((article) => (
          <div
            className={`card ${
              expandedCards.includes(article.id) ? "expanded" : ""
            }`}
            key={article.id}
            onClick={() => toggleCard(article.id)}
          >
            <img
              src={article.imageUrl}
              className="card-img-top"
              alt="Article Image"
            ></img>
            <div
              className={`card-body collapsible ${
                expandedCards.includes(article.id) ? "expanded" : ""
              }`}
            >
              <p className="small">
                Pub. <FormatDate updatedAt={article.pubDate} />
              </p>
              <p className="small">
                Updt. <FormatDate updatedAt={article.refreshDate} />
              </p>

              <a href={article.url}>
                {" "}
                <h5 className="card-title">{article.title}</h5>
              </a>
              <a href={article.url}>
                <p className="small">👤 {article.authorsByline}</p>
              </a>
              <a href={article.url}>
                <p className="small">🔗 {article.source.domain}</p>
              </a>
              <p className="card-text">{article.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisplayArticles;
