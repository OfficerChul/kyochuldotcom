import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage, PortfolioPage } from './pages';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
      </Routes>
    </div>
  );
};

export default App;