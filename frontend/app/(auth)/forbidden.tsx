import { View } from "react-native";
import { Text, Button } from "react-native-paper";
import { useRouter } from "expo-router";

export default function ForbiddenScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center p-5">
      <Text variant="headlineMedium" className="mb-4 text-center">
        Accès Refusé
      </Text>
      <Text variant="bodyLarge" className="mb-6 text-center">
        Vous n'avez pas les permissions nécessaires pour accéder à cette page.
      </Text>
      <Button
        mode="contained"
        onPress={() => router.replace("/(auth)/login")}
        className="mt-4"
      >
        Se connecter
      </Button>
    </View>
  );
}
