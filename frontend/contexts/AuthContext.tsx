import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthContextType } from "@/types/auth.type";
import { useRouter } from "expo-router";
import { secureStoreService } from "@/services/secureStore.service";

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const [token, roles] = await Promise.all([
          secureStoreService.getAuthToken(),
          secureStoreService.getUserRoles(),
        ]);

        if (token && roles) {
          setUserRoles(roles);
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error("Error checking auth:", err);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const signIn = async (token: string, roles: string[]) => {
    try {
      await Promise.all([
        secureStoreService.setAuthToken(token),
        secureStoreService.setUserRoles(roles),
      ]);

      setUserRoles(roles);
      setIsAuthenticated(true);
    } catch (err) {
      console.error("Error during sign in:", err);
      setIsAuthenticated(false);
      setUserRoles([]);
      throw err;
    }
  };

  const signOut = async () => {
    try {
      await secureStoreService.clearAuthData();
      setIsAuthenticated(false);
      setUserRoles([]);
      router.replace("/(auth)/login");
    } catch (err) {
      throw err;
    }
  };

  const hasRole = (requiredRoles: string[]): boolean => {
    if (!isAuthenticated || !userRoles.length) return false;
    return requiredRoles.some((role) => userRoles.includes(role));
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        isAuthenticated,
        isLoading,
        hasRole,
        userRoles,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
