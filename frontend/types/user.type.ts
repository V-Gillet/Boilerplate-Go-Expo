import { IdType } from "./schema.type";

export interface IUser {
  id: IdType;
  firstName: string;
  lastName: string;
  password: string;
  pseudo: string;
  email: string;
  age?: number;
  streetNumber?: number;
  address: string;
  postCode?: number;
  birthday: Date;
  createdAt: Date;
  updatedAt: Date;
  role: IRoles;
}

export enum Roles {
  ROLE_ADMIN = "ROLE_ADMIN",
  ROLE_USER = "ROLE_USER",
  // when payment is added, add a premium role
}

export interface IRoles {
  role: Roles;
}
