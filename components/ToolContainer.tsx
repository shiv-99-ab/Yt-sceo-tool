
import React from 'react';
import Loader from './common/Loader';
import ResultCard from './common/ResultCard';

interface ToolContainerProps {
  title: string;
  description: string;
  isLoading: boolean;
  results: string | string[] | null;
  resultsTitle: string;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ToolContainer: React.FC<ToolContainerProps> = ({
  title,
  description,
  isLoading,
  results,
  resultsTitle,
  children,
  onSubmit,
}) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">{title}</h1>
        <p className="mt-2 text-gray-400 max-w-2xl">{description}</p>
      </div>
      
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg shadow-xl p-6">
        <form onSubmit={onSubmit} className="space-y-4">
          {children}
        </form>
      </div>
      
      {isLoading && <Loader />}
      
      {results && (Array.isArray(results) ? results.length > 0 : results) && (
        <ResultCard title={resultsTitle} results={results} />
      )}
    </div>
  );
};

export default ToolContainer;
