import { ThemeProvider } from "@/components/ThemeProvider";
import { Stack } from "expo-router";
import "react-native-reanimated";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthContext";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="(auth)"
              options={{ headerShown: false, headerBackVisible: false }}
            />
            <Stack.Screen name="+not-found" />
          </Stack>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
