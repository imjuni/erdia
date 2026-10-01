import { EntitySchema } from "typeorm";

import type { IUser } from "./User";

export interface IPhoto {
  id: number;
  title: string;
  description: string;
  width: number;
  height: number;
}

export interface IPhotoRelation {
  user: IUser;
}

export const Photo = new EntitySchema<IPhoto & IPhotoRelation>({
  columns: {
    description: {
      charset: "utf8mb4",
      comment: "photo description",
      length: 2048,
      type: "varchar",
    },
    height: {
      type: "int",
    },
    id: {
      generated: "increment",
      primary: true,
      type: "int",
    },
    title: {
      charset: "utf8mb4",
      comment: "photo title",
      length: 512,
      type: "varchar",
    },
    width: {
      type: "int",
    },
  },
  name: "Photo",
  relations: {
    user: {
      target: "User",
      type: "one-to-one",
    },
  },
  tableName: "tbl_photo",
});
