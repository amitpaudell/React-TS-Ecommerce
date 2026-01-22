import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { FilterProvider } from './components/FilterContext.tsx';
import router from './routes/routes.tsx';
import { RouterProvider } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FilterProvider>
      <RouterProvider router={router}></RouterProvider>
    </FilterProvider>
  </StrictMode>
);
