import { FormattedMessage } from 'react-intl';

import { Sizes } from '../Col';
import { Column } from '../Column';

export const AlbumColumn: React.FC<AlbumColumnProps> = ({ sizes }) => {
  return (
    <Column sizes={sizes} label="album">
      <FormattedMessage id="common.album" />
    </Column>
  );
}

export interface AlbumColumnProps {
  sizes: Sizes;
}
