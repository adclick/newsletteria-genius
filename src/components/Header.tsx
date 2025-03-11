
import React from 'react';
import ApiKeySettings from './ApiKeySettings';

const Header = () => {
  return <header className="w-full bg-white shadow-md">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 gradient-blue rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">N</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Newsletteria</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-newsletteria-gray text-sm">Gerador de newsletters</div>
          <ApiKeySettings />
        </div>
      </div>
    </header>;
};

export default Header;
