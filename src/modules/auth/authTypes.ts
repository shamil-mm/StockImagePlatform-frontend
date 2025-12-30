export interface User {
  id: string;
  email: string;
  name: string;
  phone:string;
}

export interface AuthState {
  accessToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
}