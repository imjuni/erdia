import type IColumnRecord from '#databases/interfaces/IColumnRecord';
import type IEntityRecord from '#databases/interfaces/IEntityRecord';
import type IRelationRecord from '#databases/interfaces/IRelationRecord';

type TDatabaseRecord = IColumnRecord | IEntityRecord | IRelationRecord;

export default TDatabaseRecord;
