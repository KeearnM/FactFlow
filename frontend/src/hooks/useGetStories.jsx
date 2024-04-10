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

import React, { useEffect, useRef } from "react";

const useGetStories = (
  searchParams,
  stories,
  setStories,
  numResults,
  setNumResults,
  isLoading,
  setIsLoading,
  error,
  setError
) => {
  const lastQRef = useRef(null);
  useEffect(() => {
    const { q } = searchParams;

    // Check if q is the same as the last value
    if (lastQRef.current === q) {
      return; // Do nothing if q is the same as the last value
    }

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const url = new URL(import.meta.env.VITE_PERIGON_STORIES_URL);

        if (q) {
          url.searchParams.append("q", q);
        } else {
          url.searchParams.append("q", "Markets from this week");
        }

        //set standard from date to 2 weeks before today
        const twoWeeksAgo = new Date();
        twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
        const isoDate = twoWeeksAgo.toISOString();
        url.searchParams.append("from", isoDate);

        //parameters that will always be present
        url.searchParams.append("nameExists", "true");
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
    lastQRef.current = searchParams.q; // Update the lastQRef with the current q value
  }, [[searchParams, setStories, setNumResults, setIsLoading, setError]]);

  return { stories, numResults, isLoading, error };
};

export default useGetStories;
