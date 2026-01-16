export type UserPublic = {
    email: string
    is_active: boolean
    is_superuser: boolean
    full_name: string | null
}

export type UsersPublic = {
    data: UserPublic[]
    count: number
}

export async function userDisplay(skip: number, limit: number): Promise<UsersPublic> {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/?skip=${skip}&limit=${limit}`, {
        method: 'GET',
    });

    return response.json();
}