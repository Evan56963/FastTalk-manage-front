export interface UserPublic {
    email: string
    is_active: boolean
    is_superuser: boolean
    full_name: string | null
}

export interface UsersPublic {
    data: UserPublic[]
    count: number
}

export interface UserCreate {
    email: string
    password: string
    is_active: boolean
    is_superuser: boolean
    full_name: string | null
}