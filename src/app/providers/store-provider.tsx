import type { ReactNode } from 'react';
import { RootStore } from '../store/root-store';
import { StoreContext } from './store-context';

const rootStore = new RootStore();

interface Props {
  children: ReactNode;
}

export const StoreProvider = ({ children }: Props) => {
  return (
    <StoreContext.Provider value={rootStore}>
      {children}
    </StoreContext.Provider>
  );
};
