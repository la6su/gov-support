import { makeAutoObservable } from 'mobx';

import type { User } from './types';

export class UserStore {
    currentUser: User | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setUser(user: User) {
        this.currentUser = user;
    }

    logout() {
        this.currentUser = null;
    }
}
