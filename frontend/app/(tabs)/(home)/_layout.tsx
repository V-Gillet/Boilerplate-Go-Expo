import React from "react";
import { Redirect, Slot } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { Roles } from "@/types/user.type";

export default function HomeLayout() {
  const { isAuthenticated, hasRole } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  if (!hasRole([Roles.ROLE_USER])) {
    return <Redirect href="/(auth)/forbidden" />;
  }

  return <Slot />;
}
