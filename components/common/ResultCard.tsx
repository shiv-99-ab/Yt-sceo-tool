
import React, { useState } from 'react';

interface ResultCardProps {
  title: string;
  results: string[] | string;
  className?: string;
}

const ResultCard: React.FC<ResultCardProps> = ({ title, results, className = '' }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };
  
  const handleCopyAll = () => {
      const textToCopy = Array.isArray(results) ? results.join(', ') : results;
      navigator.clipboard.writeText(textToCopy);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
  };

  const renderContent = () => {
    if (typeof results === 'string') {
      return <p className="text-gray-300 whitespace-pre-wrap">{results}</p>;
    }

    return (
      <div className="flex flex-wrap gap-2">
        {results.map((item, index) => (
          <div key={index} className="flex items-center bg-gray-700 rounded-full px-3 py-1 text-sm font-medium text-gray-200">
            <span>{item}</span>
            <button
              onClick={() => handleCopy(item, index)}
              className="ml-2 p-1 rounded-full hover:bg-gray-600 transition"
              aria-label="Copy item"
            >
              {copiedIndex === index ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={`mt-6 bg-gray-800/50 border border-gray-700 rounded-lg shadow-xl p-6 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-100">{title}</h3>
        <button
            onClick={handleCopyAll}
            className="flex items-center px-3 py-1.5 text-xs font-medium text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600 transition"
        >
            {copiedAll ? (
               <>
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                 Copied!
               </>
            ) : (
               <>
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h8M8 7V5a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2h-2" /></svg>
                 Copy All
               </>
            )}
        </button>
      </div>
      {renderContent()}
    </div>
  );
};

export default ResultCard;
