import { BenefitStore } from '@entities/benefit';
import { UserStore } from '@entities/user';

export class RootStore {
  userStore: UserStore;
  benefitStore: BenefitStore;

  constructor() {
    this.userStore = new UserStore();
    this.benefitStore = new BenefitStore();
  }
}
