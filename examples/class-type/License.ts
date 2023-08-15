import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import type { IOrganization } from './Organization';
import type { IUser } from './User';
import factory from './factory';

export interface ILicense {
  id: number;
  title: string;
  description: string;
  expire: Date;
}

/* istanbul ignore next */
@Entity()
export class License extends BaseEntity implements ILicense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ charset: 'utf8mb4' })
  description: string;

  @Column()
  expire: Date;

  @ManyToOne('User', 'id', { createForeignKeyConstraints: false, nullable: false })
  @JoinColumn()
  user: IUser;

  // 아, Column이 없으니 DB에 테이블을 만들지 않고
  // 그리고 엔티티에 columns에 정보도 없다!
  @ManyToMany('Organization', 'id', {
    nullable: false,
    createForeignKeyConstraints: false,
  })
  @JoinTable()
  organization?: IOrganization[];

  constructor() {
    super();

    const factoried = factory({ entity: 'license' });

    this.id = factoried.id;
    this.title = factoried.title;
    this.description = factoried.description;
    this.expire = factoried.expire;

    this.user = factory({ entity: 'user' });
    this.organization = undefined;
  }
}
