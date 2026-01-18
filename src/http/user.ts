import type { UserCreate, UserPublic, UsersPublic, UserUpdate, HTTPException } from '@/types';

export async function readUsers(skip: number, limit: number): Promise<UsersPublic> {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/?skip=${skip}&limit=${limit}`, {
        method: 'GET',
    });

    return response.json();
}

export async function createUser(userData: UserCreate): Promise<UserPublic | HTTPException> {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    return response.json();
}

export async function updateUser(userId: string, userData: UserUpdate): Promise<UserPublic | HTTPException> {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/${userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    
    return response.json();
}