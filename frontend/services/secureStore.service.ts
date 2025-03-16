import * as SecureStore from "expo-secure-store";

const AUTH_TOKEN_KEY = "auth_token";
const USER_ROLES_KEY = "user_roles";

export const secureStoreService = {
  getAuthToken: async () => {
    return await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
  },
  setAuthToken: async (token: string) => {
    await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
  },
  deleteAuthToken: async () => {
    await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
  },

  getUserRoles: async () => {
    const rolesJson = await SecureStore.getItemAsync(USER_ROLES_KEY);
    return rolesJson ? JSON.parse(rolesJson) : null;
  },
  setUserRoles: async (roles: string[]) => {
    await SecureStore.setItemAsync(USER_ROLES_KEY, JSON.stringify(roles));
  },
  deleteUserRoles: async () => {
    await SecureStore.deleteItemAsync(USER_ROLES_KEY);
  },

  clearAuthData: async () => {
    await Promise.all([
      secureStoreService.deleteAuthToken(),
      secureStoreService.deleteUserRoles(),
    ]);
  },
};
