import { useEffect } from 'react';
import { useStores } from '@app/providers';

export const useLoadBenefits = () => {
  const { benefitStore } = useStores();

  useEffect(() => {
    benefitStore.loadBenefits();
  }, [benefitStore]);

  return {
    loading: benefitStore.loading,
    error: benefitStore.error,
  };
};
