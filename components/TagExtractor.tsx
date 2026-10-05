
import React, { useState } from 'react';
import { extractTags } from '../services/geminiService';
import ToolContainer from './ToolContainer';

const TagExtractor: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [tags, setTags] = useState<string[] | null>(null);
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
    setTags(null);
    try {
      const result = await extractTags(topic);
      setTags(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ToolContainer
      title="Tag Extractor"
      description="Analyze a video's topic to find the most effective tags. Enter the main subject of a video to get a list of suggested tags."
      isLoading={isLoading}
      results={tags}
      resultsTitle="Suggested Tags"
      onSubmit={handleSubmit}
    >
      <div>
        <label htmlFor="topic" className="block text-sm font-medium text-gray-300 mb-1">
          Video Topic or URL
        </label>
        <input
          id="topic"
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., '10-minute HIIT workout' or a YouTube URL"
          className="w-full bg-gray-700 border border-gray-600 text-white rounded-md p-3 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
        />
        <p className="mt-2 text-xs text-gray-500">Note: We analyze the topic of the video, not the live URL content.</p>
        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-red-600 text-white font-bold py-3 px-4 rounded-md hover:bg-red-700 disabled:bg-red-800 disabled:cursor-not-allowed transition duration-200"
      >
        {isLoading ? 'Extracting...' : 'Extract Tags'}
      </button>
    </ToolContainer>
  );
};

export default TagExtractor;
