import { EntitySchema } from 'typeorm';
import type { IOrganization } from './Organization';
import type { IUser } from './User';

export interface ILicense {
  id: number;
  title: string;
  code: string;
  description: string;
  expire: Date;
}

export interface ILicenseRelation {
  user: IUser;
  organizations: IOrganization[];
}

export const License = new EntitySchema<ILicense & ILicenseRelation>({
  name: 'License',
  tableName: 'tbl_license',
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
    code: {
      type: 'varchar',
      length: 200,
      comment: 'organization code',
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
  uniques: [
    {
      name: 'uk_license_code',
      columns: ['code', 'title'],
    },
  ],
  relations: {
    user: {
      target: 'User',
      type: 'many-to-one',
      createForeignKeyConstraints: false,
      inverseSide: 'licenses',
      joinColumn: {
        name: 'user_id',
      },
    },
    organizations: {
      target: 'Organization',
      type: 'many-to-many',
      createForeignKeyConstraints: false,
      joinTable: {
        name: 'tbl_mtm_license_organization',
        joinColumn: {
          name: 'license_id',
        },
        inverseJoinColumn: {
          name: 'organization_id',
        },
      },
    },
  },
});
