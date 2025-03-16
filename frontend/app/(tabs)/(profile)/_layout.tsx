import { useAuth } from "@/contexts/AuthContext";
import { Roles } from "@/types/user.type";
import { Redirect, Slot } from "expo-router";

export default function ProfileLayout() {
  const { isAuthenticated, hasRole } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  if (!hasRole([Roles.ROLE_USER])) {
    return <Redirect href="/(auth)/forbidden" />;
  }

  return <Slot />;
}
