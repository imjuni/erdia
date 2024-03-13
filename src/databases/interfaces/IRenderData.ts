import type { IBuildCommandOption } from '#/configs/interfaces/IBuildCommandOption';
import type { IEntityWithColumnAndRelationAndIndex } from '#/databases/interfaces/IEntityWithColumnAndRelationAndIndex';
import type { IRecordMetadata } from '#/databases/interfaces/IRecordMetadata';

export interface IRenderData {
  versions: {
    version: string;
    latest: boolean;
    entities: IEntityWithColumnAndRelationAndIndex[];
  }[];
  option: IBuildCommandOption;
  metadata: IRecordMetadata;
}
