export interface LoginArgs {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  roles: string[];
}

export interface TokenResponse {
  token: string;
  roles: string[];
}

export interface AuthContextType {
  signIn: (token: string, roles: string[]) => Promise<void>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasRole: (requiredRoles: string[]) => boolean;
  userRoles: string[];
}
