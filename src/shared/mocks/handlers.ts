import { http, HttpResponse } from 'msw';

import type { Benefit } from '@entities/benefit';

const mockBenefits: Benefit[] = [
  {
    id: '1',
    title: 'Free Medicine',
    description: 'Free medicine for citizens',
    category: 'health',
    isActive: true,
  },
  {
    id: '2',
    title: 'Transport Discount',
    description: '50% discount for public transport',
    category: 'transport',
    isActive: false,
  },
];

export const handlers = [
  http.get('http://localhost:3000/benefits', () => {
    return HttpResponse.json(mockBenefits);
  }),

  http.post('http://localhost:3000/benefits', async ({ request }) => {
    const body = (await request.json()) as Omit<Benefit, 'id'>;

    const newBenefit: Benefit = {
      id: crypto.randomUUID(),
      ...body,
    };

    mockBenefits.push(newBenefit);

    return HttpResponse.json(newBenefit, { status: 201 });
  }),
];
