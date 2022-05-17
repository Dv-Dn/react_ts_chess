import { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useRoutes } from 'react-router-dom';

// Global styles
import '@/styles/index.css';

import routes from '~react-pages';
import { RLoader } from './components/base';

const App = () => {
  return <Suspense fallback={<RLoader />}>{useRoutes(routes)}</Suspense>;
};

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
