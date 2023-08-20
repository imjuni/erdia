import type IBuildCommandOption from '#configs/interfaces/IBuildCommandOption';
import type IEntityWithColumnAndRelation from '#databases/interfaces/IEntityWithColumnAndRelation';
import type IRecordMetadata from '#databases/interfaces/IRecordMetadata';

export default interface IRenderData {
  versions: {
    version: string;
    latest: boolean;
    entities: IEntityWithColumnAndRelation[];
  }[];
  option: IBuildCommandOption;
  metadata: IRecordMetadata;
}
