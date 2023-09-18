import { bignumber, type BigNumber } from 'mathjs';
import { populate } from 'my-easy-fp';
import { CE_COLUMN_ATTRIBUTE } from 'src/configs/const-enum/CE_COLUMN_ATTRIBUTE';
import type IColumnRecord from 'src/databases/interfaces/IColumnRecord';

export default function getColumnWeight(column: Omit<IColumnRecord, 'weight'>): BigNumber {
  const weight = bignumber(0);

  const type = bignumber(
    populate(column.columnType.length).reduce((sum, index) => sum + column.columnType.charCodeAt(index), 0),
  ).mul(1000);

  return weight
    .add(column.attributeKey.indexOf(CE_COLUMN_ATTRIBUTE.PK) >= 0 ? 20000000 : 0)
    .add(column.attributeKey.indexOf(CE_COLUMN_ATTRIBUTE.FK) >= 0 ? 10000000 : 0)
    .add(type)
    .add(bignumber(122).sub(bignumber(column.name.toLowerCase().charCodeAt(0))))
    .add(
      bignumber(122)
        .sub(bignumber(column.name.toLowerCase().charCodeAt(1)))
        .div(100),
    );
}
