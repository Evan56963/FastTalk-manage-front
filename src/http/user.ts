import { VITE_BASE_URL } from '@/http/base';
import type { UserCreate, UserPublic, UsersPublic, UserUpdate, HTTPException, Message } from '@/types';

export async function readUsers(skip: number, limit: number): Promise<UsersPublic> {
    const response = await fetch(`${VITE_BASE_URL}/users/?skip=${skip}&limit=${limit}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
        },
    });

    return response.json();
}

export async function createUser(userData: UserCreate): Promise<UserPublic | HTTPException> {
    const response = await fetch(`${VITE_BASE_URL}/users/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
        },
        body: JSON.stringify(userData),
    });

    return response.json();
}

export async function updateUser(userId: string, userData: UserUpdate): Promise<UserPublic | HTTPException> {
    const response = await fetch(`${VITE_BASE_URL}/users/${userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify(userData),
    });
    
    return response.json();
}

export async function deleteUser(userId: string): Promise<Message | HTTPException> {
    const response = await fetch(`${VITE_BASE_URL}/users/${userId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`,
        },
    });

    return response.json();
}