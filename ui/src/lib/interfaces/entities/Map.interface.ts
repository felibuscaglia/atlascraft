import { ILayer } from "./Layer.interface";

export interface IMap {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  layers: ILayer[];
}
