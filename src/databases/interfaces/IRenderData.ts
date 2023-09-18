import type IBuildCommandOption from 'src/configs/interfaces/IBuildCommandOption';
import type IEntityWithColumnAndRelation from 'src/databases/interfaces/IEntityWithColumnAndRelation';
import type IRecordMetadata from 'src/databases/interfaces/IRecordMetadata';

export default interface IRenderData {
  versions: {
    version: string;
    latest: boolean;
    entities: IEntityWithColumnAndRelation[];
  }[];
  option: IBuildCommandOption;
  metadata: IRecordMetadata;
}
