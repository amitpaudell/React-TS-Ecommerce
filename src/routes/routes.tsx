import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import MainContent from '../components/MainContent';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    children: [
      {
        index: true,
        element: <MainContent></MainContent>,
      },
    ],
  },
]);

export default router;
