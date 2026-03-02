export type UserRole = 'citizen' | 'admin';

export interface User {
    id: string;
    fullName: string;
    email: string;
    role: UserRole;
}
