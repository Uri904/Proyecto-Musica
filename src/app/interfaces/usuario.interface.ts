export interface Usuario {
  nombre: string;
  correo: string;
  password: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

export interface RegistroResponse {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}