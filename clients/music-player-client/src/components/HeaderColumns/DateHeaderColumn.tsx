import { FormattedMessage } from 'react-intl';

import { Sizes } from '../Col';
import { Column } from '../Column';

export const DateColumn: React.FC<DateColumnProps> = ({ sizes }) => {
  return (
    <Column sizes={sizes} label="date">
      <FormattedMessage id="common.dateAdded" />
    </Column>
  );
}

export interface DateColumnProps {
  sizes: Sizes;
}
