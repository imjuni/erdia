import IErdiaCommonOption from '@config/interface/IErdiaCommonOption';
import TOutputComponent from '@config/interface/TOutputComponent';
import TTableColumn from '@config/interface/TTableColumn';

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
   * entity-name
   * attribute-key
   * comment
   */
  tableColumns: TTableColumn[];
}
