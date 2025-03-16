import React from "react";
import { View, SafeAreaView, ScrollView } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState, useEffect } from "react";
import { getAgeFromBirthday } from "../../utils/ageCalculator";
import { IUser } from "../../types/user.type";
import { useRouter } from "expo-router";
import { registerUser } from "@/queries/user.query";
import { useMutation } from "@tanstack/react-query";
import { isEmail } from "@/service/validator";
import { WrappedHelperText } from "@/components/input/WrappedHelperText";
import FlashMessage from "@/components/flash/flashMessage";
import { ValidationRule } from "@/types/rule.type";

// rules string|false inspired by vuetify : https://vuetifyjs.com/en/components/text-fields/#clearable

export default function SignupScreen() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [user, setUser] = useState<IUser>({ birthday: new Date() } as IUser);
  const [error, setError] = useState<Error | null>(null);
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    pseudo: false,
    streetNumber: false,
    address: false,
    postCode: false,
  });

  const validationRules: Record<string, ValidationRule[]> = {
    firstName: [(value) => (!value ? "Le prénom est requis" : false)],
    lastName: [(value) => (!value ? "Le nom de famille est requis" : false)],
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
    pseudo: [(value) => (!value ? "Le pseudonyme est requis" : false)],
    streetNumber: [(value) => (!value ? "Le numéro de rue est requis" : false)],
    address: [(value) => (!value ? "L'adresse est requise" : false)],
    postCode: [
      (value) => (!value ? "Le code postal est requis" : false),
      (value) =>
        value && value.toString().length !== 5
          ? "Le code postal doit contenir 5 chiffres"
          : false,
    ],
  };

  useEffect(() => {
    const age = getAgeFromBirthday(user.birthday);
    setUser((prevUser) => ({ ...prevUser, age }));
  }, [user.birthday]);

  const onDateChange = (event: any, date?: Date) => {
    if (date) {
      const newAge = getAgeFromBirthday(date);
      const adjustedDate = new Date(
        date.getTime() + date.getTimezoneOffset() * 60000
      );
      setUser({ ...user, birthday: adjustedDate, age: newAge });
      console.log("user", user);

      setShow(false);
    }
  };

  const handleInputChange = (name: keyof IUser, value: string) => {
    if (name === "streetNumber" || name === "postCode") {
      setUser({ ...user, [name]: Number(value) });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleBlur = (field: string) => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
  };

  const handleShow = () => {
    setShow(true);
  };

  const registerUserMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      router.replace("/(auth)/login");
    },
    onError: (error) => {
      setError(error);
    },
  });

  const handleSignup = async () => {
    //revover and set all field to touched true in order to trigger all validations at once.
    const allFields: string[] = Object.keys(touchedFields);
    setTouchedFields(
      allFields.reduce((acc, field) => ({ ...acc, [field]: true }), {})
    );

    const hasErrors = allFields.some((field) => {
      const rules = validationRules[field];
      for (const rule of rules) {
        const result = rule(user[field as keyof IUser]);
        if (result !== false) return true;
      }

      return false;
    });

    //we do not allow form submition if there are errors
    if (!hasErrors) {
      registerUserMutation.mutate({ user: user });
    }
  };

  const handleNumberInput = (strInput: string): number | undefined => {
    const num: number = parseInt(strInput);
    if (isNaN(num)) {
      return undefined;
    }

    return num;
  };

  const getFieldError = (field: string, value: any): string | false => {
    if (!touchedFields[field]) return false;
    const rules = validationRules[field];
    for (const rule of rules) {
      const result = rule(value);
      // if the function rule of type ValidationRule return a string, there is an error
      if (result !== false) return result;
    }

    return false;
  };

  if (registerUserMutation.status === "pending") {
    return <Text>Chargement...</Text>;
  }

  return (
    <SafeAreaView className="flex-1 justify-center items-center m-14">
      <ScrollView className="w-full max-w-md">
        {error && <FlashMessage message={error?.message} />}
        <TextInput
          label="Prénom"
          value={user.firstName}
          error={!!getFieldError("firstName", user.firstName)}
          onBlur={() => handleBlur("firstName")}
          onChangeText={(text) => handleInputChange("firstName", text)}
        />
        <WrappedHelperText
          value={user.firstName}
          rules={validationRules.firstName}
          touched={touchedFields.firstName}
        />

        <TextInput
          label="Nom de famille"
          value={user.lastName}
          error={!!getFieldError("lastName", user.lastName)}
          onBlur={() => handleBlur("lastName")}
          onChangeText={(text) => handleInputChange("lastName", text)}
        />
        <WrappedHelperText
          value={user.lastName}
          rules={validationRules.lastName}
          touched={touchedFields.lastName}
        />

        <TextInput
          label="Adresse email"
          value={user.email}
          error={!!getFieldError("email", user.email)}
          onBlur={() => handleBlur("email")}
          onChangeText={(text) => handleInputChange("email", text)}
        />
        <WrappedHelperText
          value={user.email}
          rules={validationRules.email}
          touched={touchedFields.email}
        />

        <TextInput
          label="Mot de passe"
          secureTextEntry
          value={user.password}
          error={!!getFieldError("password", user.password)}
          onBlur={() => handleBlur("password")}
          onChangeText={(text) => handleInputChange("password", text)}
        />
        <WrappedHelperText
          value={user.password}
          rules={validationRules.password}
          touched={touchedFields.password}
        />

        <TextInput
          label="Pseudonyme"
          value={user.pseudo}
          error={!!getFieldError("pseudo", user.pseudo)}
          onBlur={() => handleBlur("pseudo")}
          onChangeText={(text) => handleInputChange("pseudo", text)}
        />
        <WrappedHelperText
          value={user.pseudo}
          rules={validationRules.pseudo}
          touched={touchedFields.pseudo}
        />

        <Button onPress={handleShow} icon="calendar" mode="contained">
          Date de naissance
        </Button>
        {show && (
          <DateTimePicker
            mode="date"
            locale="fr-FR"
            value={user.birthday}
            timeZoneOffsetInMinutes={0}
            onChange={onDateChange}
          />
        )}
        <Text>Date sélectionnée : {user.birthday.toLocaleString()}</Text>

        <TextInput
          label="Numéro de rue"
          value={user.streetNumber?.toString() || ""}
          keyboardType="numeric"
          error={!!getFieldError("streetNumber", user.streetNumber)}
          onBlur={() => handleBlur("streetNumber")}
          onChangeText={(text) =>
            setUser({ ...user, streetNumber: handleNumberInput(text) })
          }
        />
        <WrappedHelperText
          value={user.streetNumber}
          rules={validationRules.streetNumber}
          touched={touchedFields.streetNumber}
        />

        <TextInput
          label="Adresse"
          value={user.address}
          error={!!getFieldError("address", user.address)}
          onBlur={() => handleBlur("address")}
          onChangeText={(text) => handleInputChange("address", text)}
        />
        <WrappedHelperText
          value={user.address}
          rules={validationRules.address}
          touched={touchedFields.address}
        />

        <TextInput
          label="Code postal"
          value={user.postCode?.toString() || ""}
          keyboardType="numeric"
          maxLength={5}
          error={!!getFieldError("postCode", user.postCode)}
          onBlur={() => handleBlur("postCode")}
          onChangeText={(text) =>
            setUser({ ...user, postCode: handleNumberInput(text) })
          }
        />
        <WrappedHelperText
          value={user.postCode}
          rules={validationRules.postCode}
          touched={touchedFields.postCode}
        />

        <View>
          <Button mode="contained" onPress={() => router.push("/login")}>
            Connexion
          </Button>
          <Button onPress={handleSignup}>Inscription</Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
