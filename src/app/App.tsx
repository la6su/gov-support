import { RouterProvider } from '@app/providers/router-provider';
import { StoreProvider } from '@app/providers';

export const App = () => {
  return (
    <StoreProvider>
      <RouterProvider />
    </StoreProvider>
  );
};
