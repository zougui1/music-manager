import { FormattedMessage } from 'react-intl';

import { Sizes } from '../Col';
import { Column } from '../Column';

export const NameColumn: React.FC<NameColumnProps> = ({ sizes }) => {
  return (
    <Column sizes={sizes} label="name">
      <FormattedMessage id="common.name" />
    </Column>
  );
}

export interface NameColumnProps {
  sizes: Sizes;
}
