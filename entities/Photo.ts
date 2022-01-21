import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface IPhoto {
  id: number;
  title: string;
  description: string;
  size: string;
}

@Entity()
export class Photo extends BaseEntity implements IPhoto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  size: string;

  constructor() {
    super();

    this.id = 0;
    this.title = '';
    this.description = '';
    this.size = '';
  }
}
