/*=============================================================================
 | Purpose:  THIS CUSTOM HOOK UTILIZES GOOGLE'S GENERATIVE AI TO PERFORM A
 |           FACT-CHECK ON AN ARTICLE. IT APPLIES SAFETY SETTINGS TO ENSURE
 |           THAT THE GENERATED CONTENT ADHERES TO CERTAIN HARMFUL CONTENT 
 |           GUIDELINES. THE HOOK TAKES AN ARTICLE AS INPUT, REQUESTS A 
 |           FACT-CHECK ANALYSIS FROM THE GENERATIVE MODEL, AND RETRIEVES
 |           THE RESULTING FACT-CHECKED DATA.
 |           API DOC: Takes in a article and return the fact check result from gemini
 |
 | Input / Parameters:  THE HOOK REQUIRES THE FOLLOWING INPUTS:
 |           - article: A STRING REPRESENTING THE ARTICLE THAT NEEDS TO BE 
 |                      FACT-CHECKED.
 |   
 | Output / Returns:  THE HOOK RETURNS AN OBJECT CONTAINING:
 |           - loading: A BOOLEAN INDICATING WHETHER THE FACT-CHECK IS 
 |                      CURRENTLY IN PROGRESS.
 |           - result: THE RESULT OF THE FACT-CHECK, WHICH IS A TEXTUAL 
 |                     REPRESENTATION OF THE FACT-CHECKED ARTICLE.
 |           - error: ANY ERROR MESSAGES ENCOUNTERED DURING THE FACT-CHECKING 
 |                    PROCESS.
 |
 *===========================================================================*/

import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const useFactCheckv2 = (article) => {
  const API_KEY = import.meta.env.VITE_GEMINI_KEY;
  const genAI = new GoogleGenerativeAI(API_KEY);

  const safetySettings = [
    { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
    { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
    { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
    { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
  ];

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (article) {
      setLoading(true);
      setError(null);
      const factCheckArticle = async () => {
        try {
          const model = genAI.getGenerativeModel({
            model: "gemini-pro",
            safetySettings,
          });

          // const promptRequest =
          //   "can you extract the claims from this article and do a fact check on them with external sources and also display each with the headers [claims], [Source] and [Verification], no using the article itself as an source";
          // const prompt = article + promptRequest;

          // const prompt = `Fact-check this article for me, please include a source for every claim and make sure the source is external and not from the article itself, for every claim indicate if its true or false as well, return the data in a JSON object: [${article}]`;
          const prompt = `I found this article [${article}]. Can you help me fact-check this  and return the analysis in a consistent JSON format?
             In the JSON file, include the following fields:
             claims: get the claims of the article.
             credible_sources: List of credible sources (academic journals, established news organizations, government websites) found that discuss the topic.
             fact_check_results: An object with two properties:
             claim_supported: Boolean value (true/false) indicating if the claim is supported by the credible sources.
             analysis: Text explaining the analysis and potential reasons behind the fact check result (e.g., evidence for/against the claim, identified biases).
             potential_biases: (Optional) List any potential biases identified in the article or the credible sources found.`;
          const response = await model.generateContent(prompt);
          const text = await response.response.text();
          setResult(text);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };
      factCheckArticle();
    }
  }, [article]);

  return { loading, result, error };
};

export default useFactCheckv2;
