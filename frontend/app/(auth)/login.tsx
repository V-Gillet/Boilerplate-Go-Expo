import React from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import { TextInput, Button } from "react-native-paper";
import { useState } from "react";
import { login } from "@/queries/user.query";
import { LoginArgs } from "@/types/auth.type";
import { useMutation } from "@tanstack/react-query";
import FlashMessage from "@/components/flash/flashMessage";
import { SafeAreaView } from "react-native-safe-area-context";
import { isEmail } from "@/service/validator";
import { WrappedHelperText } from "@/components/input/WrappedHelperText";
import { ValidationRule } from "@/types/rule.type";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginScreen() {
  const { signIn } = useAuth();
  const router = useRouter();
  const [loginArgs, setLoginArgs] = useState({ email: "", password: "" });
  const [error, setError] = useState<Error | null>(null);
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({
    email: false,
    password: false,
  });

  const validationRules: Record<string, ValidationRule[]> = {
    email: [
      (value) => (!value ? "L'email est requis" : false),
      (value) => (value && !isEmail(value) ? "Format d'email invalide" : false),
    ],
    password: [
      (value) => (!value ? "Le mot de passe est requis" : false),
      (value) =>
        value && value.length < 8
          ? "Le mot de passe doit contenir au moins 8 caractères"
          : false,
    ],
  };

  const handleInputChange = (name: keyof LoginArgs, value: string) => {
    setLoginArgs((prevArgs) => ({ ...prevArgs, [name]: value }));
  };

  const handleBlur = (field: string) => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
  };

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      await signIn(data.token, data.roles);
      router.navigate("/(tabs)/(home)");
    },
    onError: (error) => {
      setError(error);
    },
  });

  const handleLogin = async () => {
    const allFields = Object.keys(touchedFields);
    setTouchedFields(
      allFields.reduce((acc, field) => ({ ...acc, [field]: true }), {})
    );
    const hasErrors = allFields.some((field) => {
      const rules = validationRules[field];
      for (const rule of rules) {
        const result = rule(loginArgs[field as keyof LoginArgs]);
        if (result !== false) return true;
      }
      return false;
    });

    if (!hasErrors) {
      setError(null);
      mutation.mutate(loginArgs);
    }
  };

  const getFieldError = (field: string, value: any): string | false => {
    if (!touchedFields[field]) return false;
    const rules = validationRules[field];
    for (const rule of rules) {
      const result = rule(value);
      if (result !== false) return result;
    }
    return false;
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center m-14">
      <View className="w-full max-w-md">
        {error && <FlashMessage message={error?.message} />}
        <TextInput
          className="mb-4"
          label="Adresse email"
          placeholder="Entrez votre email"
          value={loginArgs.email}
          error={!!getFieldError("email", loginArgs.email)}
          onBlur={() => handleBlur("email")}
          onChangeText={(text) => handleInputChange("email", text)}
        />
        <WrappedHelperText
          value={loginArgs.email}
          rules={validationRules.email}
          touched={touchedFields.email}
        />

        <TextInput
          className="mb-4"
          label="Mot de passe"
          placeholder="Entrez votre mot de passe"
          secureTextEntry
          value={loginArgs.password}
          error={!!getFieldError("password", loginArgs.password)}
          onBlur={() => handleBlur("password")}
          onChangeText={(text) => handleInputChange("password", text)}
        />
        <WrappedHelperText
          value={loginArgs.password}
          rules={validationRules.password}
          touched={touchedFields.password}
        />

        <View>
          <Button mode="contained" onPress={handleLogin} className="mb-2">
            Connexion
          </Button>
          <Button onPress={() => router.replace("/(auth)/signup")}>
            Inscription
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
