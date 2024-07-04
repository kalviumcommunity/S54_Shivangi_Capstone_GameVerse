import React, { useState } from "react";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import "../Styles/NavBarStyles.css";
import ReactMarkdown from "react-markdown";

/**
 * AutocompleteSearch component for searching gaming categories.
 * Uses the Google Generative AI API to generate suggestions based on user input.
 */
const AutocompleteSearch = () => {
  // State variables
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Get the API key from environment variables
  const gemini_key = import.meta.env.VITE_GEMINI_API;
  const genAI = new GoogleGenerativeAI(gemini_key);

  /**
   * Fetches suggestions from the Generative AI API based on the user's query.
   * @param {string} query - The user's search query
   */
  async function fetchSuggestions(query) {
    try {
      setIsLoading(true);
      const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [
              {
                text: `I am searching for gaming categories related to ${query} or starting with the letters ${query}. Please respond with a list of names of gaming category names only. For example: Action, Adventure, Puzzle, Shooting, Arcade, Casual, Multiplayer, Cards, Racing, Other.`,
              },
            ],
          },
        ],
        generationConfig: {
          maxOutputTokens: 50,
          temperature: 0.7,
          topK: 1,
          topP: 1,
        },
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
          {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
          },
        ],
      });

      const res = await chat.sendMessage(query);
      const suggestions = await res.response.text();
      setSuggestions(suggestions.split("\n"));
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setIsLoading(false);
    }
  }

  /**
   * Handles changes to the search input and fetches suggestions.
   * @param {Event} e - The input change event.
   */
  const handleSearchChange = (e) => {
    const query = e.target.value.trim();
    setSearchQuery(query);
    if (query !== "") {
      fetchSuggestions(query);
    } else {
      setSuggestions([]);
      setIsLoading(false); 
    }
  };

  return (
    <div style={{ margin: "20px", maxWidth: "600px" }}>
      {/* Search input */}
      <div
        className="nav-search-bar"
        style={{
          background: "rgba(255, 255, 255, 0.2)",
          width: "360px",
          color: "white",
          display: "flex",
          alignItems: "center",
        }}
      >
        <svg
          className="search-icon"
          aria-hidden="true"
          viewBox="0 0 24 24"
          style={{ marginRight: "10px", fill: "white" }}
        >
          <g>
            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
          </g>
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..."
          style={{
            background: "transparent",
            border: "none",
            outline: "none",
            color: "white",
            flex: "1",
            fontSize: "16px",
          }}
        />
      </div>
      {/* Loading indicator */}
      {isLoading && <p style={{ fontSize: "16px" }}>Loading suggestions...</p>}
      {/* Suggestions */}
      {!isLoading && suggestions.length > 0 && (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              style={{
                fontSize: "16px",
                marginBottom: "5px",
                borderBottom: "1px solid #ccc",
                paddingBottom: "5px",
              }}
            >
              <ReactMarkdown>{suggestion}</ReactMarkdown>
            </li>
          ))}
        </ul>
      )}
      {/* No suggestions message */}
      {!isLoading && suggestions.length === 0 && searchQuery.trim() !== "" && (
        <p style={{ fontSize: "16px" }}>No suggestions found.</p>
      )}
    </div>
  );
};

export default AutocompleteSearch;
