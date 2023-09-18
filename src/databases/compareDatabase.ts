import getColumnHash from '#/common/getColumnHash';
import getEntityHash from '#/common/getEntityHash';
import getIndexHash from '#/common/getIndexHash';
import getRelationHash from '#/common/getRelationHash';
import { CE_CHANGE_KIND } from '#/databases/const-enum/CE_CHANGE_KIND';
import { CE_RECORD_KIND } from '#/databases/const-enum/CE_RECORD_KIND';
import type IRecordMetadata from '#/databases/interfaces/IRecordMetadata';
import type TDatabaseRecord from '#/databases/interfaces/TDatabaseRecord';
import { detailedDiff } from 'deep-object-diff';
import { settify } from 'my-easy-fp';

export default function compareDatabase(
  metadata: IRecordMetadata,
  next: TDatabaseRecord[],
  prev: TDatabaseRecord[],
): TDatabaseRecord[] {
  if (prev.length <= 0) {
    return next.map((record) => ({ ...record, change: CE_CHANGE_KIND.NONE }));
  }

  const nextMap = next.reduce<Record<string, TDatabaseRecord>>((aggregation, record) => {
    switch (record.$kind) {
      case CE_RECORD_KIND.ENTITY:
        return { ...aggregation, [getEntityHash(record)]: record };
      case CE_RECORD_KIND.COLUMN:
        return { ...aggregation, [getColumnHash(record)]: record };
      case CE_RECORD_KIND.RELATION:
        return { ...aggregation, [getRelationHash(record)]: record };
      case CE_RECORD_KIND.INDEX:
        return { ...aggregation, [getIndexHash(record)]: record };
      default:
        return aggregation;
    }
  }, {});

  const prevMap = prev.reduce<Record<string, TDatabaseRecord>>((aggregation, record) => {
    switch (record.$kind) {
      case CE_RECORD_KIND.ENTITY:
        return { ...aggregation, [getEntityHash(record)]: record };
      case CE_RECORD_KIND.COLUMN:
        return { ...aggregation, [getColumnHash(record)]: record };
      case CE_RECORD_KIND.RELATION:
        return { ...aggregation, [getRelationHash(record)]: record };
      case CE_RECORD_KIND.INDEX:
        return { ...aggregation, [getIndexHash(record)]: record };
      default:
        return aggregation;
    }
  }, {});

  const compared = settify([...Object.keys(nextMap), ...Object.keys(prevMap)]).map((key): TDatabaseRecord => {
    const fromNext = nextMap[key];
    const fromPrev = prevMap[key];
    // add
    if (fromNext != null && fromPrev == null) {
      return { ...fromNext, change: CE_CHANGE_KIND.ADD } satisfies TDatabaseRecord;
    }

    // delete
    if (fromNext == null && fromPrev != null) {
      return { ...fromPrev, change: CE_CHANGE_KIND.DELETE, version: metadata.version } satisfies TDatabaseRecord;
    }

    const forCompareNext: TDatabaseRecord = {
      ...fromNext,
      title: fromNext.title ?? '',
      change: CE_CHANGE_KIND.NONE,
      createdAt: '',
      updatedAt: '',
      version: '',
    };
    const forComparePrev: TDatabaseRecord = {
      ...fromPrev,
      title: fromPrev.title ?? '',
      change: CE_CHANGE_KIND.NONE,
      createdAt: '',
      updatedAt: '',
      version: '',
    };
    const diffed = detailedDiff(forCompareNext, forComparePrev);

    // none
    if (
      Object.keys(diffed.added).length <= 0 &&
      Object.keys(diffed.updated).length <= 0 &&
      Object.keys(diffed.deleted).length <= 0
    ) {
      return { ...fromNext, change: CE_CHANGE_KIND.NONE } satisfies TDatabaseRecord;
    }

    // change
    return { ...fromNext, change: CE_CHANGE_KIND.CHANGE, prev: fromPrev } satisfies TDatabaseRecord;
  });

  return compared;
}
