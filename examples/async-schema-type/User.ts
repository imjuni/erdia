import { EntitySchema } from "typeorm";

import type { ILicense } from "./License";
import type { IPhoto } from "./Photo";

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  isActive: boolean;
}

export interface IUserRelation {
  photo: IPhoto;
  licenses: ILicense[];
}

export const User = new EntitySchema<IUser & IUserRelation>({
  columns: {
    firstName: {
      charset: "utf8mb4",
      comment: "user firstname",
      length: 256,
      name: "first_name",
      type: "varchar",
    },
    id: {
      generated: "increment",
      name: "id",
      primary: true,
      type: "int",
    },
    isActive: {
      comment: "line1\nline2\nline3",
      name: "is_active",
      type: "boolean",
    },
    lastName: {
      charset: "utf8mb4",
      length: 256,
      name: "last_name",
      type: "varchar",
    },
  },
  name: "User",
  relations: {
    licenses: {
      inverseSide: "user",
      target: "License",
      type: "one-to-many",
    },
    photo: {
      createForeignKeyConstraints: false,
      joinColumn: {
        name: "photo_id",
      },
      nullable: true,
      target: "Photo",
      type: "one-to-one",
    },
  },
  tableName: "tbl_user",
});
