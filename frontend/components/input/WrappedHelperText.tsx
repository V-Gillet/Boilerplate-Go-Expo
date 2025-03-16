import React from "react";
import { HelperText } from "react-native-paper";
import { ValidationRule } from "@/types/rule.type";

export enum HelperTextType {
  ERROR = "error",
  INFO = "info",
}

interface WrappedHelperTextProps {
  value: any;
  rules?: ValidationRule[];
  touched?: boolean;
  type?: HelperTextType;
  customMessage?: string;
}

export const WrappedHelperText: React.FC<WrappedHelperTextProps> = ({
  value,
  rules = [],
  touched = false,
  type = HelperTextType.ERROR,
  customMessage,
}) => {
  const getError = (): string | false => {
    if (!touched) return false;
    if (customMessage) return customMessage;

    for (const rule of rules) {
      const result = rule(value);
      if (result !== false) return result;
    }
    return false;
  };

  const error = getError();

  return (
    <HelperText type={type} visible={!!error}>
      {error}
    </HelperText>
  );
};
