import { InputProps } from '../components/Input';

interface IFieldData {
  label: string;
  validationValues?: any;
}

export type FieldData = IFieldData & InputProps;
