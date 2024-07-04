import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "./ChatBot.css";

/**
 * Chatbot component for interacting with the chatbot API.
 */
const Chatbot = () => {
  // API endpoint URL
  const url = import.meta.env.VITE_API_URL;
  // Input query state
  const [query, setQuery] = useState("");
  // Response state
  const [response, setResponse] = useState("");
  // Error state
  const [error, setError] = useState("");
  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handles input change event.
   * @param {Event} e - The input change event.
   */
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  /**
   * Handles form submission.
   * @param {Event} e - The form submit event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResponse("");

    if (!query.trim()) {
      setError("Please enter a query.");
      return;
    }

    setIsLoading(true);

    try {
      // Send POST request to the chatbot API
      const res = await axios.post(`${url}/genai/chatbot`, {
        query,
      });
      setResponse(res.data.response);
    } catch (err) {
      if (err.response && err.response.status === 429) {
        // Handle rate limit exceeded error
        setError("Rate limit exceeded. Please try again later.");
      } else {
        // Handle other errors
        setError(err.response?.data?.error || "An error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-md">
      {/* Chatbot title */}
      <h2 className="text-2xl font-bold mb-4 text-center">Chatbot</h2>
      {/* Chatbot form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          {/* Input field for query */}
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Enter your query"
            className="input input-bordered w-full"
            disabled={isLoading}
          />
        </div>
        {/* Submit button */}
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
      {/* Display error message if any */}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {/* Display response if any */}
      {response && (
        <p className="mt-4">
          <strong>Response:</strong> <ReactMarkdown>{response}</ReactMarkdown>
        </p>
      )}
    </div>
  );
};

export default Chatbot;
