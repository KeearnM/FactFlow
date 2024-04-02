/*=============================================================================
 | Purpose:  FETCH ARTICLE DATA FROM PERIGON API USING PARAMETERS PASSED AS 
 |           PROPS TO TAILOR THE API CALL.
 |           API DOC: https://docs.goperigon.com/reference/all-news
 |
 | Input / Parameters:  SEARCH TERM (Q), FROM ().
 |   
 | Output / Returns:  DESCRIBE THE OUTPUT IT PRODUCES.
 |
 *===========================================================================*/

import React, { useState, useEffect } from "react";

const useGetArticles = () => {
  const [articles, setArticles] = useState([]);
  const [numResults, setNumResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const url = new URL(import.meta.env.VITE_PERIGON_ARTICLES_URL);
        url.searchParams.append("q", "Ukraine");
        url.searchParams.append("from", "2023-03-01");
        url.searchParams.append("searchTranslation", "false");
        url.searchParams.append("showReprints", "true");
        url.searchParams.append("sortBy", "relevance");
        url.searchParams.append("page", "0");
        url.searchParams.append("size", "20");
        url.searchParams.append("showNumResults", "false");

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "x-api-key": import.meta.env.VITE_PERIGON_API_KEY,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setNumResults(data.numResults);
          setArticles(data.articles);
          console.log(data);
        } else {
          setError("Failed to load stories");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { articles, numResults, isLoading, error };
};

export default useGetArticles;
