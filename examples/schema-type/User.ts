import { EntitySchema } from 'typeorm';
import type { ILicense } from './License';
import type { IPhoto } from './Photo';

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
  name: 'User',
  tableName: 'tbl_user',
  columns: {
    id: {
      name: 'id',
      type: 'int',
      primary: true,
      generated: 'increment',
    },
    firstName: {
      name: 'first_name',
      type: 'varchar',
      length: 256,
      comment: 'user firstname',
      charset: 'utf8mb4',
    },
    lastName: {
      name: 'last_name',
      type: 'varchar',
      length: 256,
      charset: 'utf8mb4',
    },
    isActive: {
      name: 'is_active',
      type: 'boolean',
      comment: 'line1\nline2\nline3',
    },
  },
  relations: {
    photo: {
      target: 'Photo',
      type: 'one-to-one',
      nullable: true,
      createForeignKeyConstraints: false,
      joinColumn: {
        name: 'photo_id',
      },
    },
    licenses: {
      target: 'License',
      type: 'one-to-many',
      inverseSide: 'user',
    },
  },
});
