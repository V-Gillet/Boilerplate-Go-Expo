import { Tabs } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "react-native-paper";
import { useAuth } from "@/contexts/AuthContext";
import { Redirect } from "expo-router";
import { Roles } from "@/types/user.type";

export default function TabLayout() {
  const theme = useTheme();
  const { isAuthenticated, hasRole } = useAuth();

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  if (!hasRole([Roles.ROLE_USER])) {
    return <Redirect href="/(auth)/forbidden" />;
  }

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: theme.colors.primary }}>
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Feather size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(profile)"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
