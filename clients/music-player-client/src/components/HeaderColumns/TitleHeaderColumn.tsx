import { FormattedMessage } from 'react-intl';

import { Sizes } from '../Col';
import { Column } from '../Column';

export const TitleColumn: React.FC<TitleColumnProps> = ({ sizes }) => {
  return (
    <Column sizes={sizes} label="title">
      <FormattedMessage id="common.title" />
    </Column>
  );
}

export interface TitleColumnProps {
  sizes: Sizes;
}
