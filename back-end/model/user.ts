import { Role } from '../types';
import { Shoppingcart } from './shoppingcart';

import { User as UserPrisma } from '@prisma/client';

export class User {
    private id?: number | undefined;
    private email: string;
    private password: string;
    private role: Role;
    private shoppingcarts: Shoppingcart[] = [];

    constructor(user: { id?: number; email: string; password: string; role: Role }) {
        this.validate(user);
        this.id = user.id;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
    }

    getId(): number | undefined {
        return this.id;
    }

    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }

    getRole(): Role {
        return this.role;
    }

    getShoppingcarts(): Shoppingcart[] {
        return this.shoppingcarts;
    }

    addShoppingcart(shoppingcart: Shoppingcart) {
        if (this.shoppingcarts.includes(shoppingcart)) {
            throw new Error('This shopping cart is already added to this user');
        }
        this.shoppingcarts.push(shoppingcart);
        shoppingcart.setUser(this);
    }

    validate(user: { email: string; password: string; role: Role }) {
        if (!user.email?.trim()) {
            throw new Error('Email is required');
        }

        if (!user.password?.trim()) {
            throw new Error('Password is required');
        }

        if (!user.role?.trim()) {
            throw new Error('Role is required');
        }
    }

    equals(user: User): boolean {
        return (
            this.id === user.getId() &&
            this.email === user.getEmail() &&
            this.password === user.getPassword() &&
            this.role === user.getRole() &&
            this.shoppingcarts === user.getShoppingcarts()
        );
    }

    static from({ id, email, password, role }: UserPrisma) {
        return new User({ id, email, password, role });
    }
}
