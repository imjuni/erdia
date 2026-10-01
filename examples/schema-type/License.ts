import { EntitySchema } from "typeorm";

import type { IOrganization } from "./Organization";
import type { IUser } from "./User";

export interface ILicense {
  id: number;
  title: string;
  code: string;
  description: string;
  weight: number;
  expire: Date;
}

export interface ILicenseRelation {
  user: IUser;
  organizations: IOrganization[];
}

export const License = new EntitySchema<ILicense & ILicenseRelation>({
  columns: {
    code: {
      charset: "utf8mb4",
      comment: "organization code",
      length: 200,
      type: "varchar",
    },
    description: {
      charset: "utf8mb4",
      comment: "organization description",
      length: 2048,
      type: "varchar",
    },
    expire: {
      default: () => "CURRENT_TIMESTAMP",
      type: "datetime",
    },
    id: {
      generated: "increment",
      primary: true,
      type: "int",
    },
    title: {
      charset: "utf8mb4",
      comment: "organization title",
      length: 512,
      type: "varchar",
    },
    weight: {
      comment: "sort weight",
      type: "double precision",
    },
  },
  name: "License",
  relations: {
    organizations: {
      createForeignKeyConstraints: false,
      joinTable: {
        inverseJoinColumn: {
          name: "organization_id",
        },
        joinColumn: {
          name: "license_id",
        },
        name: "tbl_mtm_license_organization",
      },
      target: "Organization",
      type: "many-to-many",
    },
    user: {
      createForeignKeyConstraints: false,
      inverseSide: "licenses",
      joinColumn: {
        name: "user_id",
      },
      target: "User",
      type: "many-to-one",
    },
  },
  tableName: "tbl_license",
  uniques: [
    {
      name: "uk_license_code",
      columns: ["code", "title"],
    },
  ],
});
