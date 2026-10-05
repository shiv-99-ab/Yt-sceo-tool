
import React, { useState } from 'react';
import { Tool } from './types';
import Sidebar from './components/Sidebar';
import KeywordTool from './components/KeywordTool';
import TitleGenerator from './components/TitleGenerator';
import DescriptionGenerator from './components/DescriptionGenerator';
import HashtagGenerator from './components/HashtagGenerator';
import TagExtractor from './components/TagExtractor';

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<Tool>(Tool.Keywords);

  const renderTool = () => {
    switch (activeTool) {
      case Tool.Keywords:
        return <KeywordTool />;
      case Tool.Titles:
        return <TitleGenerator />;
      case Tool.Descriptions:
        return <DescriptionGenerator />;
      case Tool.Hashtags:
        return <HashtagGenerator />;
      case Tool.Tags:
        return <TagExtractor />;
      default:
        return <KeywordTool />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 to-slate-800 font-sans">
      <Sidebar activeTool={activeTool} setActiveTool={setActiveTool} />
      <main className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          {renderTool()}
        </div>
      </main>
    </div>
  );
};

export default App;
