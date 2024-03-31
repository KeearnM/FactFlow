/*=============================================================================
 | Purpose:  EXPLAIN WHAT THIS FUNCTION DOES TO SUPPORT THE CORRECT
 |           OPERATION OF THE PROGRAM, AND HOW IT DOES IT.
 |           API DOC: Takes in a article and return the fact check result from gemini
 |
 | Input / Parameters:  DESCRIBE THE INPUT IT REQUIRES. => the article will be the input
 |   
 | Output / Returns:  DESCRIBE THE OUTPUT IT PRODUCES. => the result via the result state
 |
 *===========================================================================*/

import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const useFactCheck = () => {
  const API_KEY = import.meta.env.GEMINI_KEY;
  const genAI = new GoogleGenerativeAI(API_KEY);

  //without this safety settings, gemini won't return most prompts due to the safety fiters
  const safetySettings = [
    { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
    { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
    { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
    { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
  ];

  //due to the time gemini takes to return the prompt a loading state is likely needed
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  //this will be one the functions that will be exported, it can be used like this:
  //factCheck(article or story)
  //the result returned from gemini will be stored in the result state
  const factCheck = async (toBeCheck) => {
    setLoading(true);
    setError(null);
    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-pro",
        safetySettings,
      });

      const prompt = toBeCheck;
      const response = await model.generateContent(prompt);
      const text = await response.response.text();
      setResult(text);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { factCheck, loading, result, error };
};

export default useFactCheck;
