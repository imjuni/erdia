import { EntitySchema } from "typeorm";

import type { ILicense } from "./License";

export interface IOrganization {
  id: number;
  title: string;
  description: string;
  expire: Date;
}

export interface IOrganizationRelation {
  licenses: ILicense[];
}

export const Organization = new EntitySchema<
  IOrganization & IOrganizationRelation
>({
  columns: {
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
  },
  indices: [
    {
      name: "idx_organization_title",
      columns: ["title", "description"],
    },
  ],
  name: "Organization",
  relations: {
    licenses: {
      createForeignKeyConstraints: false,
      joinTable: {
        inverseJoinColumn: {
          name: "license_id",
        },
        joinColumn: {
          name: "organization_id",
        },
        name: "tbl_mtm_license_organization",
      },
      target: "License",
      type: "many-to-many",
    },
  },
  tableName: "tbl_organization",
});
