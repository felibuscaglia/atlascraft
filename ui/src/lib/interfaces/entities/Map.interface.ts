import { ILayer } from "./Layer.interface";
import { IUser } from "./User.interface";

export interface IMap {
  id: string;
  name: string;
  description?: string;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  layers: ILayer[];
  users: IUser[];
}
