export interface IRecordMetadata {
  /**
   * Project name, default option use database name. You can choose this value from database name or package.json name
   */
  name: string;

  /** html document title */
  title?: string;

  /**
   * entity version, default option use timestamp. developer can set that use package.json version
   * */
  version: string;

  /**
   * This record created-at. if you don't use version field in package.json field, maybe it same
   * version field.
   *
   * @format date-time
   */
  createdAt: string;

  /**
   * This record updated-at. if you don't use version field in package.json field, maybe it same
   * version field.
   *
   * @format date-time
   */
  updatedAt: string;
}
