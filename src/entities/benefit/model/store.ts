import { makeAutoObservable, runInAction } from 'mobx';
import type { Benefit } from './types';
import { benefitApi } from '../api/benefit-api';

export class BenefitStore {
  private benefits: Benefit[] = [];
  private currentRequestId = 0;
  loading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  // -------------------------
  // SYNC ACTIONS
  // -------------------------

  setBenefits(benefits: Benefit[]) {
    this.benefits = benefits;
  }

  addBenefit(benefit: Benefit) {
    this.benefits.push(benefit);
  }

  // -------------------------
  // ASYNC ACTION (ВАЖНО)
  // -------------------------
  async createBenefit(data: Omit<Benefit, 'id'>) {
    try {
      this.loading = true;
      this.error = null;

      const newBenefit = await benefitApi.createBenefit(data);

      runInAction(() => {
        this.benefits.push(newBenefit);
      });
    } catch (e: any) {
      runInAction(() => {
        this.error = e.message;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }

  async loadBenefits() {
    const requestId = ++this.currentRequestId;
    this.loading = true;
    this.error = null;

    try {
      const data = await benefitApi.getBenefits();

      runInAction(() => {
        if (requestId !== this.currentRequestId) return;

        this.benefits = data;
        this.loading = false;
      });
    } catch (err) {
      runInAction(() => {
        if (requestId !== this.currentRequestId) return;

        this.error = err instanceof Error ? err.message : 'Unknown error';
        this.loading = false;
      });
    }
  }

  // -------------------------
  // COMPUTED
  // -------------------------

  get allBenefits(): Benefit[] {
    return this.benefits;
  }

  get activeBenefits(): Benefit[] {
    return this.benefits.filter((b) => b.isActive);
  }

  get benefitsByCategory() {
    return (category: string): Benefit[] => this.benefits.filter((b) => b.category === category);
  }
}
