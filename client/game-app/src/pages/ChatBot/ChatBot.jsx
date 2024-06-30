import React, { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "./ChatBot.css";

const Chatbot = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

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
      const res = await axios.post("http://localhost:3000/genai/chatbot", {
        query,
      });
      setResponse(res.data.response);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Chatbot</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Enter your query"
            className="input input-bordered w-full"
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {response && (
        <p className="mt-4">
          <strong>Response:</strong> <ReactMarkdown>{response}</ReactMarkdown>  
        </p>
      )}
    </div>
  );
};

export default Chatbot;
