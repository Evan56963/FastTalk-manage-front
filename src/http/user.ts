import type { UserCreate, UserPublic, UsersPublic } from '@/types';

export async function userDisplay(skip: number, limit: number): Promise<UsersPublic> {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/?skip=${skip}&limit=${limit}`, {
        method: 'GET',
    });

    return response.json();
}

export async function createUser(userData: UserCreate): Promise<UserPublic> {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    return response.json();
}