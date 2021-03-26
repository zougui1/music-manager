import { FormattedMessage } from 'react-intl';

import { Sizes } from '../Col';
import { Column } from '../Column';

export const NumberColumn: React.FC<NumberColumnProps> = ({ sizes }) => {
  return (
    <Column sizes={sizes} label="number">
      <FormattedMessage id="common.#" />
    </Column>
  );
}

export interface NumberColumnProps {
  sizes?: Sizes | undefined;
}
