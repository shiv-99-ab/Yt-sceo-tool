
import React, { useState } from 'react';
import { generateHashtags } from '../services/geminiService';
import ToolContainer from './ToolContainer';

const HashtagGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [hashtags, setHashtags] = useState<string[] | null>(null);
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
    setHashtags(null);
    try {
      const result = await generateHashtags(topic);
      setHashtags(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ToolContainer
      title="Hashtag Generator"
      description="Find the best hashtags to boost your video's reach. Enter a topic to get a mix of broad and niche hashtags."
      isLoading={isLoading}
      results={hashtags}
      resultsTitle="Suggested Hashtags"
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
          placeholder="e.g., 'DIY home organization hacks'"
          className="w-full bg-gray-700 border border-gray-600 text-white rounded-md p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
        />
        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-red-600 text-white font-bold py-3 px-4 rounded-md hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed transition duration-200"
      >
        {isLoading ? 'Generating...' : 'Generate Hashtags'}
      </button>
    </ToolContainer>
  );
};

export default HashtagGenerator;
