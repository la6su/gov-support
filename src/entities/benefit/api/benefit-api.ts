import { apiClient } from '@shared/api/base-api';

import type { Benefit } from '../model/types';

export const benefitApi = {
  getBenefits() {
    return apiClient.get<Benefit[]>('/benefits');
  },

  createBenefit(data: Omit<Benefit, 'id'>) {
    return apiClient.post<Benefit>('/benefits', data);
  },
};
