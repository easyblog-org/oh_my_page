import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import IntersectObserver from '@/components/common/IntersectObserver';
import { Toaster } from '@/components/ui/sonner';
import { MainLayout } from './components/layouts/MainLayout';

import routes from './routes';

const App: React.FC = () => {
  return (
    <Router>
      <IntersectObserver />
      <Routes>
        <Route element={<MainLayout />}>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={route.element}
            />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
      <Toaster position="top-center" />
      <Analytics />
    </Router>
  );
};

export default App;
