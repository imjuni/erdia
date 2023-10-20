import { EntitySchema } from 'typeorm';
import type { IUser } from './User';

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
  name: 'Photo',
  tableName: 'tbl_photo',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: 'increment',
    },
    title: {
      type: 'varchar',
      length: 512,
      comment: 'photo title',
      charset: 'utf8mb4',
    },
    description: {
      type: 'varchar',
      length: 2048,
      comment: 'photo description',
      charset: 'utf8mb4',
    },
    width: {
      type: 'int',
    },
    height: {
      type: 'int',
    },
  },
  relations: {
    user: {
      target: 'User',
      type: 'one-to-one',
    },
  },
});
