/*=============================================================================
 | Purpose:  FETCH STORIES DATA FROM PERIGON API USING PARAMETERS PASSED AS 
 |           PROPS TO TAILOR THE API CALL.
 |           API DOC: https://docs.goperigon.com/reference/stories-1
 |
 | Input / Parameters:  .
 |   
 | Output / Returns:  DESCRIBE THE OUTPUT IT PRODUCES.
 |
 *===========================================================================*/

import React from "react";
import { useState, useEffect } from "react";

const useGetStories = () => {
  const [stories, setStories] = useState([]);
  const [numResults, setNumResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const url = new URL(import.meta.env.VITE_PERIGON_STORIES_URL);

        url.searchParams.append("nameExists", "true");
        url.searchParams.append("q", "US Elections");
        //set standard from date to 2 weeks before today
        const twoWeeksAgo = new Date();
        twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
        const isoDate = twoWeeksAgo.toISOString();
        url.searchParams.append("from", isoDate);
        // url.searchParams.append("from", "2023-03-01");
        url.searchParams.append("minClusterSize", "5");
        url.searchParams.append("page", "0");
        url.searchParams.append("size", "20");
        url.searchParams.append("sortBy", "createdAt");
        url.searchParams.append("showNumResults", "false");
        url.searchParams.append("showDuplicates", "false");

        console.log(url.toString());

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
          setStories(data.results);
          // console.log(data);
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

  return { stories, numResults, isLoading, error };
};

export default useGetStories;
