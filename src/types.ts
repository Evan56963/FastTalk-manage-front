export type LoginSuccess = {
  access_token: string;
  token_type: string;
}

export type HTTPException = {
  detail: string;
}

interface UserBase {
    email: string
    is_active: boolean
    is_superuser: boolean
    full_name?: string | null
}

export interface UserPublic extends UserBase {
    id: string
}

export interface UsersPublic {
    data: UserPublic[]
    count: number
}

export interface UserCreate extends UserBase {
    password: string
}

export interface UserUpdate extends Partial<UserBase>{
    email?: string
    password?: string
}