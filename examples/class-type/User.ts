import { BaseEntity, Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import type { ILicense } from './License';
import type { IPhoto } from './Photo';
import factory from './factory';

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  isActive: boolean;
}

/* istanbul ignore next */
@Entity()
export class User extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name', comment: 'user firstname', charset: 'utf8mb4' })
  firstName: string;

  @Column({ type: 'varchar', length: 64, charset: 'utf8mb4' })
  lastName: string;

  @Column({ comment: 'line1\nline2\nline3' })
  isActive: boolean;

  @OneToOne('Photo', {
    nullable: true,
    createForeignKeyConstraints: false,
  })
  @JoinColumn()
  photo: IPhoto;

  @OneToMany('License', 'id', { createForeignKeyConstraints: false })
  @JoinColumn()
  license?: ILicense[];

  constructor() {
    super();

    this.id = 0;
    this.firstName = '';
    this.lastName = '';
    this.isActive = false;
    this.photo = factory({ entity: 'photo' });
    this.license = undefined;
  }
}
