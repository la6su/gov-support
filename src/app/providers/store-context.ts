import { createContext, useContext } from 'react';
import type { RootStore } from '../store/root-store';

export const StoreContext = createContext<RootStore | null>(null);

export const useStores = (): RootStore => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStores must be used within StoreProvider');
  }
  return context;
};
