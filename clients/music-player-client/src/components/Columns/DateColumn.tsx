import { Sizes } from '../Col';
import { Column } from '../Column';
import { FormatDate } from '../FormatDate';

export const DateColumn: React.FC<DateColumnProps> = ({ sizes, date, className }) => {
  return (
    <Column sizes={sizes} label="date" className={className}>
      <FormatDate date={date} />
    </Column>
  );
}

export interface DateColumnProps {
  sizes: Sizes;
  date: string | number | Date | undefined;
  className?: string | undefined;
}
