import IErdiaCommonOption from '@config/interface/IErdiaCommonOption';
import TOutputComponent from '@config/interface/TOutputComponent';
import { TTABLE_COLUMN } from '@config/interface/TTABLE_COLUMN';

export default interface IErdiaDocumentOption extends IErdiaCommonOption {
  /** type of generated document */
  t: TOutputComponent[];
  /** type of generated document */
  components: TOutputComponent[];

  /**
   * ouptut column of generated table
   *
   * column-name(*)
   * column-type(*)
   * is-nullable(*)
   * entity-name
   * attribute-key
   * comment
   * charset
   */
  tableColumns: TTABLE_COLUMN[];
}
