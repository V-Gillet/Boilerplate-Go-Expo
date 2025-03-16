import { LoginArgs, TokenResponse } from "@/types/auth.type";
import { IUser } from "../types/user.type";
import fetchClient from "./fetchClient";

const registerUser = async (user: { user: IUser }): Promise<IUser> => {
  //todo: try catch here
  const data = await fetchClient("/signup", {
    method: "POST",
    body: JSON.stringify(user),
  });

  return data;
};

const login = async (args: LoginArgs): Promise<TokenResponse> => {
  try {
    const data: TokenResponse = await fetchClient("/login", {
      method: "POST",
      body: JSON.stringify(args),
    });

    return data;
  } catch (error) {
    console.error("login failed:", error);

    throw error;
  }
};

export { registerUser, login };
