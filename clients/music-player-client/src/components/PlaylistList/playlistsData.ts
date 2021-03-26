import { Sizes } from '../Col';

export const colSizes: ColSizes = {
  number: {
    default: 13,
    xs: 3,
    sm: 14,
    md: 2,
    lg: 2,
  },
  name: {
    default: 14,
    xs: 19,
    sm: 16,
    md: 12,
    lg: 12,
  },
  date: {
    default: 0,
    xs: 0,
    sm: 0,
    md: 4,
    lg: 5,
  },
  duration: {
    default: 0,
    xs: 0,
    sm: 4,
    md: 5,
    lg: 5,
  },
};

export interface ColSizes {
  number: Sizes;
  name: Sizes;
  date: Sizes;
  duration: Sizes;
}
