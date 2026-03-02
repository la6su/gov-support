import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BenefitStore } from './store';
import * as apiModule from '../api/benefit-api';

describe('BenefitStore', () => {
  let store: BenefitStore;

  beforeEach(() => {
    store = new BenefitStore();
  });

  it('loads benefits successfully', async () => {
    const mockData = [
      {
        id: '1',
        title: 'Test',
        description: 'Test desc',
        category: 'health',
        isActive: true,
      },
    ];

    vi.spyOn(apiModule.benefitApi, 'getBenefits').mockResolvedValueOnce(mockData);

    const promise = store.loadBenefits();

    expect(store.loading).toBe(true);

    await promise;

    expect(store.loading).toBe(false);
    expect(store.error).toBeNull();
    expect(store.allBenefits).toHaveLength(1);
  });

  it('handles API error', async () => {
    vi.spyOn(apiModule.benefitApi, 'getBenefits').mockRejectedValueOnce(new Error('Network error'));

    await store.loadBenefits();

    expect(store.loading).toBe(false);
    expect(store.error).toBe('Network error');
  });

  it('ignores stale request result', async () => {
    let resolveFirst!: (value: any) => void;
    let resolveSecond!: (value: any) => void;

    const firstPromise = new Promise((res) => {
      resolveFirst = res;
    });

    const secondPromise = new Promise((res) => {
      resolveSecond = res;
    });

    vi.spyOn(apiModule.benefitApi, 'getBenefits')
      .mockReturnValueOnce(firstPromise as any)
      .mockReturnValueOnce(secondPromise as any);

    const firstCall = store.loadBenefits();
    const secondCall = store.loadBenefits();

    // Сначала резолвим второй (актуальный)
    resolveSecond([
      {
        id: '2',
        title: 'Second',
        description: '',
        category: 'health',
        isActive: true,
      },
    ]);

    await secondCall;

    // Потом резолвим первый (устаревший)
    resolveFirst([
      {
        id: '1',
        title: 'First',
        description: '',
        category: 'health',
        isActive: true,
      },
    ]);

    await firstCall;

    expect(store.allBenefits).toHaveLength(1);
    expect(store.allBenefits[0]?.id).toBe('2');
  });
});
