import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import factory from "./factory";
import type { ILicense } from "./License";
import type { IPhoto } from "./Photo";

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

  @Column({ charset: "utf8mb4", comment: "user firstname", name: "first_name" })
  firstName: string;

  @Column({ charset: "utf8mb4", length: 64, type: "varchar" })
  lastName: string;

  @Column({ comment: "line1\nline2\nline3" })
  isActive: boolean;

  @OneToOne("Photo", {
    createForeignKeyConstraints: false,
    nullable: true,
  })
  @JoinColumn()
  photo: IPhoto;

  @OneToMany("License", "id", { createForeignKeyConstraints: false })
  @JoinColumn()
  license?: ILicense[];

  constructor() {
    super();

    this.id = 0;
    this.firstName = "";
    this.lastName = "";
    this.isActive = false;
    this.photo = factory({ entity: "photo" });
    this.license = undefined;
  }
}
