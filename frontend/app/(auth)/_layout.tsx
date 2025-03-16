import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          headerTitle: "Connexion",
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          headerTitle: "Inscription",
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="forbidden"
        options={{
          headerTitle: "Accès Refusé",
          headerBackVisible: false,
        }}
      />
    </Stack>
  );
}
