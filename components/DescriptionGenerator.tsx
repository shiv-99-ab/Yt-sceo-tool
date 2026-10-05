
import React, { useState } from 'react';
import { generateDescription } from '../services/geminiService';
import ToolContainer from './ToolContainer';

const DescriptionGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!topic.trim() || !title.trim()) {
      setError('Please enter both a topic and a title.');
      return;
    }
    setError(null);
    setIsLoading(true);
    setDescription(null);
    try {
      const result = await generateDescription(topic, title);
      setDescription(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ToolContainer
      title="Description Generator"
      description="Create compelling, SEO-rich descriptions for your videos in seconds. Provide your video topic and title to generate a complete description."
      isLoading={isLoading}
      results={description}
      resultsTitle="Generated Description"
      onSubmit={handleSubmit}
    >
      <div className="space-y-4">
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-gray-300 mb-1">
            Video Topic
          </label>
          <input
            id="topic"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., 'Home coffee brewing techniques'"
            className="w-full bg-gray-700 border border-gray-600 text-white rounded-md p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
          />
        </div>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
            Video Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., 'The Ultimate Guide to Pour-Over Coffee'"
            className="w-full bg-gray-700 border border-gray-600 text-white rounded-md p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
          />
        </div>
        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-red-600 text-white font-bold py-3 px-4 rounded-md hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed transition duration-200"
      >
        {isLoading ? 'Generating...' : 'Generate Description'}
      </button>
    </ToolContainer>
  );
};

export default DescriptionGenerator;
