import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import MainContent from '../components/MainContent';
import ProductPage from '../components/ProductPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    children: [
      {
        index: true,
        element: <MainContent></MainContent>,
      },
      {
        path: 'product/:id',
        element: <ProductPage></ProductPage>,
      },
    ],
  },
]);

export default router;
