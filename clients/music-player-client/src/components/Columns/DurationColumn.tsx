import { Sizes } from '../Col';
import { Column } from '../Column';
import { formatDuration } from '../../utils';

export const DurationColumn: React.FC<DurationColumnProps> = ({ sizes, duration }) => {
  return (
    <Column sizes={sizes} label="duration">
      {formatDuration(duration * 1000)}
    </Column>
  );
}

export interface DurationColumnProps {
  sizes: Sizes;
  duration: number;
}
