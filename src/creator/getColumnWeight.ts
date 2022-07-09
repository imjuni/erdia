import IColumnData from '@typeorm/interface/IColumnData';
import { bignumber, BigNumber } from 'mathjs';
import { populate } from 'my-easy-fp';

export default function getColumnWeight(column: IColumnData): BigNumber {
  const weight = bignumber(0);

  const type = bignumber(
    populate(column.columnType.length).reduce((sum, index) => sum + column.columnType.charCodeAt(index), 0),
  ).mul(1000);

  return weight
    .add(column.attributeKey === 'PK' ? 20000000 : 0)
    .add(column.attributeKey === 'FK' ? 10000000 : 0)
    .add(type)
    .add(bignumber(122).sub(bignumber(column.propertyName.toLowerCase().charCodeAt(0))))
    .add(
      bignumber(122)
        .sub(bignumber(column.propertyName.toLowerCase().charCodeAt(1)))
        .div(100),
    );
}
