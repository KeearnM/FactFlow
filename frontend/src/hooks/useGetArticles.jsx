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

const useGetArticles = (
  searchParams,
  articles,
  setArticles,
  numResults,
  setNumResults,
  isLoading,
  setIsLoading,
  error,
  setError
) => {
  useEffect(() => {
    const {
      q,
      country,
      sourceGroup,
      category,
      topic,
      from,
      to,
      sortBy,
      showReprints,
      paywall,
      excludeLabel,
      ...rest
    } = searchParams;
    console.log("Reached useGetArticles!");
    console.log("q: " + q);
    console.log("country: " + country);
    console.log("sourceGroup: " + sourceGroup);
    console.log("category: " + category);
    console.log("topic: " + topic);
    console.log("from: " + from);
    console.log("to: " + to);
    console.log("sortBy: " + sortBy);
    console.log("showReprints: " + showReprints);
    console.log("paywall: " + paywall);
    console.log("excludeLabel: " + excludeLabel);

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const url = new URL(import.meta.env.VITE_PERIGON_ARTICLES_URL);
        url.searchParams.append("q", q);
        if (country) {
          url.searchParams.append("country", country);
        }
        if (sourceGroup) {
          url.searchParams.append("sourceGroup", sourceGroup);
        }
        if (category) {
          const categories = searchParams.category.split(", ");
          categories.forEach((categoryItem) => {
            url.searchParams.append("category", categoryItem.trim());
          });
        }
        if (topic) {
          const topics = searchParams.topic.split(", ");
          topics.forEach((topicItem) => {
            url.searchParams.append("category", topicItem.trim());
          });
        }
        if (from) {
          url.searchParams.append("from", from);
        } else {
          const twoWeeksAgo = new Date();
          twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
          const isoDate = twoWeeksAgo.toISOString();
          url.searchParams.append("from", isoDate);
        }
        if (to) {
          url.searchParams.append("from", to);
        }
        url.searchParams.append("sortBy", sortBy);
        url.searchParams.append("showReprints", showReprints);

        if (excludeLabel) {
          const excludedLabels = searchParams.excludeLabel.split(", ");
          excludedLabels.forEach((labelItem) => {
            url.searchParams.append("excludedLabel", labelItem.trim());
          });
        }

        //categories and topics excludeLabel are arrays

        //parameters that will always be present
        url.searchParams.append("searchTranslation", "false");
        // url.searchParams.append("paywall", paywall);
        url.searchParams.append("page", "0");
        url.searchParams.append("size", "40");
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
  }, [searchParams, setArticles, setNumResults, setIsLoading, setError]);

  return { articles, numResults, isLoading, error };
};

export default useGetArticles;
