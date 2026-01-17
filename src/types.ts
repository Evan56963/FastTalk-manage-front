export type LoginSuccess = {
  access_token: string;
  token_type: string;
}

export type HTTPException = {
  detail: string;
}

export interface UserPublic {
    id: string
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

export interface UserUpdate {
    email: string | null
    password: string | null
    is_active: boolean
    is_superuser: boolean
    full_name: string | null
}