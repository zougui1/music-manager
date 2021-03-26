import React from 'react';
import { FormattedDate } from 'react-intl';

export const FormatDate: React.FC<FormatDateProps> = ({ date }) => {

  return (
    <FormattedDate
      day="2-digit"
      month="short"
      year="numeric"
      value={date}
    />
  );
};

export interface FormatDateProps {
  date: string | number | Date;
}
