import React from "react";
import { Text } from "react-native";

type flashMessageProps = {
  message: string;
};

function FlashMessage(props: flashMessageProps) {
  return (
    <Text className="text-red-600 border border-dashed border-red-600 text-center mb-2">
      Erreur : {props.message}
    </Text>
  );
}

export default FlashMessage;
