import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import type { ILicense } from './License';
import factory from './factory';

export interface IOrganization {
  id: number;
  title: string;
  description: string;
  expire: Date;
}

@Entity()
/* istanbul ignore next */
export class Organization extends BaseEntity implements IOrganization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  expire: Date;

  @ManyToMany('License', 'id', {
    nullable: true,
    createForeignKeyConstraints: false,
  })
  license?: ILicense[];

  constructor() {
    super();

    const factoried = factory({ entity: 'organization' });

    this.id = factoried.id;
    this.title = factoried.title;
    this.description = factoried.description;
    this.expire = factoried.expire;

    this.license = undefined;
  }
}
