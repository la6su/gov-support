import { createBrowserRouter } from 'react-router-dom';

import { HomePage } from '@pages/home';
import { BenefitsPage } from '@pages/benefits';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/benefits',
    element: <BenefitsPage />,
  },
]);
