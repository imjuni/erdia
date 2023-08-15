import { EntitySchema } from 'typeorm';
import type { ILicense } from './License';

export interface IOrganization {
  id: number;
  title: string;
  description: string;
  expire: Date;
}

export interface IOrganizationRelation {
  licenses: ILicense[];
}

export const Organization = new EntitySchema<IOrganization & IOrganizationRelation>({
  name: 'Organization',
  tableName: 'tbl_organization',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: 'increment',
    },
    title: {
      type: 'varchar',
      length: 512,
      comment: 'organization title',
      charset: 'utf8mb4',
    },
    description: {
      type: 'varchar',
      length: 2048,
      comment: 'organization description',
      charset: 'utf8mb4',
    },
    expire: {
      type: 'datetime',
      default: () => 'CURRENT_TIMESTAMP',
    },
  },
  relations: {
    licenses: {
      target: 'License',
      type: 'many-to-many',
      createForeignKeyConstraints: false,
      joinTable: {
        name: 'tbl_mtm_license_organization',
        joinColumn: {
          name: 'organization_id',
        },
        inverseJoinColumn: {
          name: 'license_id',
        },
      },
    },
  },
});
