import type IColumnRecord from 'src/databases/interfaces/IColumnRecord';
import type IEntityRecord from 'src/databases/interfaces/IEntityRecord';
import type IRelationRecord from 'src/databases/interfaces/IRelationRecord';

type TDatabaseRecord = IColumnRecord | IEntityRecord | IRelationRecord;

export default TDatabaseRecord;
