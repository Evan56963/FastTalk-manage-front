type LoginSuccess = {
  access_token: string;
  token_type: string;
}

type LoginError = {
  detail: string;
}

export async function login(username: string, password: string): Promise<LoginSuccess | LoginError> {
    const formdata = new URLSearchParams();
    formdata.append('username', username);
    formdata.append('password', password);

    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/login/access-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formdata,
    });

    return response.json();
}