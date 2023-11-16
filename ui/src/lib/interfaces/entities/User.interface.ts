import { IMap } from "./Map.interface";

export interface IUser {
  id: string;
  fullName: string;
  email: string;
  maps: IMap[];
}
