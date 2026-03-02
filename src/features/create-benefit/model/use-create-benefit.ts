import { useState } from 'react';
import { useStores } from '@app/providers';
import type { Benefit } from '@entities/benefit/model/types';

type CreateBenefitInput = Omit<Benefit, 'id'>;

export const useCreateBenefit = () => {
  const { benefitStore } = useStores();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createBenefit = async (data: CreateBenefitInput) => {
    try {
      setLoading(true);
      setError(null);

      await benefitStore.createBenefit(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    createBenefit,
    loading,
    error,
  };
};
