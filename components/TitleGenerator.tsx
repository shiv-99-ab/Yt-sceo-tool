
import React, { useState } from 'react';
import { generateTitles } from '../services/geminiService';
import ToolContainer from './ToolContainer';

const TitleGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [titles, setTitles] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!topic.trim()) {
      setError('Please enter a video topic.');
      return;
    }
    setError(null);
    setIsLoading(true);
    setTitles(null);
    try {
      const result = await generateTitles(topic);
      setTitles(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ToolContainer
      title="Title Generator"
      description="Generate catchy, click-worthy titles for your videos. Enter your video's topic to get started."
      isLoading={isLoading}
      results={titles}
      resultsTitle="Generated Titles"
      onSubmit={handleSubmit}
    >
      <div>
        <label htmlFor="topic" className="block text-sm font-medium text-gray-300 mb-1">
          Video Topic
        </label>
        <input
          id="topic"
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., 'Unboxing the new iPhone'"
          className="w-full bg-gray-700 border border-gray-600 text-white rounded-md p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
        />
        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-red-600 text-white font-bold py-3 px-4 rounded-md hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed transition duration-200"
      >
        {isLoading ? 'Generating...' : 'Generate Titles'}
      </button>
    </ToolContainer>
  );
};

export default TitleGenerator;
