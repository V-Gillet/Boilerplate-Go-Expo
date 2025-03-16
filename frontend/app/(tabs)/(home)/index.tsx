import { Text, Button } from "react-native-paper";
import { View } from "react-native";
import { useState } from "react";
import { helloQuery } from "@/queries/hello.query";
import { secureStoreService } from "@/services/secureStore.service";
import { useAuth } from "@/contexts/AuthContext";
export default function HomeScreen() {
  const { signOut } = useAuth();
  const [item, setItem] = useState("");
  const [hello, setHello] = useState("");

  const handleLogout = async () => {
    await signOut();
  };

  const handleHello = async () => {
    setHello(await helloQuery());
  };

  const showToken = async () => {
    const token = await secureStoreService.getAuthToken();

    if (token) {
      setItem(token);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text style={{ fontFamily: "Inter-Thin", fontSize: 16 }}>{item}</Text>
      <Text style={{ fontFamily: "Inter-Regular", fontSize: 16 }}>
        Regular Text
      </Text>
      <Text style={{ fontFamily: "Inter-Black", fontSize: 16 }}>
        Black Text
      </Text>
      <Text style={{ fontFamily: "Inter-Light", fontSize: 16 }}>
        Light Text
      </Text>
      <Text style={{ fontFamily: "Inter-Bold", fontSize: 16 }}>Bold Text</Text>
      <Button onPress={handleLogout}>Logout</Button>
      <Button onPress={handleHello}>Hello World</Button>
      <Button onPress={showToken}>Show token</Button>
      <Text>{hello}</Text>
    </View>
  );
}
