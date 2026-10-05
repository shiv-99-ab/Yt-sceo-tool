
import React, { useState } from 'react';
import { Tool } from '../types';

interface SidebarProps {
  activeTool: Tool;
  setActiveTool: (tool: Tool) => void;
}

const iconMap: Record<Tool, string> = {
  [Tool.Keywords]: '🔑',
  [Tool.Titles]: '📝',
  [Tool.Descriptions]: '📄',
  [Tool.Hashtags]: '#️⃣',
  [Tool.Tags]: '🏷️',
};

const Sidebar: React.FC<SidebarProps> = ({ activeTool, setActiveTool }) => {
  const [isOpen, setIsOpen] = useState(false);

  const tools = Object.values(Tool);

  const NavLinks = () => (
    <nav className="mt-8">
      <ul>
        {tools.map((tool) => (
          <li key={tool} className="mb-2">
            <button
              onClick={() => {
                setActiveTool(tool);
                setIsOpen(false);
              }}
              className={`w-full text-left flex items-center p-3 rounded-lg transition-colors duration-200 ${
                activeTool === tool
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <span className="mr-3 text-xl">{iconMap[tool]}</span>
              <span className="font-medium">{tool}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        className="md:hidden fixed top-4 left-4 z-30 p-2 rounded-md bg-gray-800 text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      {/* Sidebar for Desktop */}
      <aside className="hidden md:block w-64 bg-gray-800/50 p-6 flex-shrink-0">
        <div className="text-white text-2xl font-bold flex items-center">
         <svg className="w-8 h-8 mr-2 text-red-500" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.73,18.78 17.93,18.84C17.13,18.91 16.44,18.94 15.84,18.94L15,19C12.81,19 11.2,18.84 10.17,18.56C9.27,18.31 8.69,17.73 8.44,16.83C8.31,16.36 8.22,15.73 8.16,14.93C8.09,14.13 8.06,13.44 8.06,12.84L8,12C8,9.81 8.16,8.2 8.44,7.17C8.69,6.27 9.27,5.69 10.17,5.44C10.64,5.31 11.27,5.22 12.07,5.16C12.87,5.09 13.56,5.06 14.16,5.06L15,5C17.19,5 18.8,5.16 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z" />
         </svg>
          YT Copilot
        </div>
        <NavLinks />
      </aside>

      {/* Mobile Sidebar (Overlay) */}
      <div className={`fixed inset-0 z-20 md:hidden transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="w-64 h-full bg-gray-800 p-6 shadow-2xl">
          <div className="text-white text-2xl font-bold flex items-center">
            YT Copilot
          </div>
          <NavLinks />
        </div>
        <div className="flex-1 bg-black/50" onClick={() => setIsOpen(false)}></div>
      </div>
    </>
  );
};

export default Sidebar;
