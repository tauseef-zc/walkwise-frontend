export interface RegisterFormInput {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  password_confirmation?: string;
}

export interface RegisterRequestError {
  message?: string;
  errors?: { [key: string]: string };
  error?: string;
}

export interface LoginFormInput {
  email: string;
  password: string;
}

export interface LoginRequestError {
  message: string;
  errors: { [key: string]: string };
  error: string;
}