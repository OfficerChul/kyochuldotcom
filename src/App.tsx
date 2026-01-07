import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoadingQuote from './shared/components/ui/LoadingQuote';

const HomePage = lazy(() => import('./pages/HomePage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));

const LoadingFallback = () => (
  <LoadingQuote
    className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
    quoteClassName="text-gray-800 dark:text-gray-100"
    authorClassName="text-gray-500 dark:text-gray-300"
    spinnerClassName="border-b-2 border-gray-600 dark:border-gray-200"
  />
);

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/blog/*" element={<BlogPage />} />
          <Route path="/diary/*" element={<Navigate to="/blog" replace />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
