import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
            GardenVision
          </h1>
        </div>
        
        <nav className="hidden sm:flex gap-6 text-sm font-medium text-slate-600">
          <a href="#" className="hover:text-emerald-600 transition-colors">How it Works</a>
          <a href="#" className="hover:text-emerald-600 transition-colors">Gallery</a>
          <a href="#" className="hover:text-emerald-600 transition-colors">About</a>
        </nav>

        <div className="sm:hidden">
            {/* Mobile menu placeholder */}
        </div>
      </div>
    </header>
  );
};