export type LoginSuccess = {
  access_token: string;
  token_type: string;
}

export type LoginError = {
  detail: string;
}