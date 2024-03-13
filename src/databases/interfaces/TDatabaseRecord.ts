import type { IColumnRecord } from '#/databases/interfaces/IColumnRecord';
import type { IEntityRecord } from '#/databases/interfaces/IEntityRecord';
import type { IIndexRecord } from '#/databases/interfaces/IIndexRecord';
import type { IRelationRecord } from '#/databases/interfaces/IRelationRecord';

export type TDatabaseRecord = IColumnRecord | IEntityRecord | IRelationRecord | IIndexRecord;
