import { Sizes } from '../Col';

export const colSizes: ColSizes = {
  number: {
    default: 2,
    xs: 3,
    sm: 3,
    md: 2,
    lg: 2,
  },
  title: {
    default: 14,
    xs: 20,
    sm: 16,
    md: 13,
    lg: 10,
  },
  album: {
    default: 0,
    xs: 0,
    sm: 0,
    md: 0,
    lg: 6,
  },
  date: {
    default: 0,
    xs: 0,
    sm: 0,
    md: 4,
    lg: 3,
  },
  duration: {
    default: 3,
    xs: 0,
    sm: 4,
    md: 4,
    lg: 3,
  },
};

export interface ColSizes {
  number: Sizes;
  title: Sizes;
  album: Sizes;
  date: Sizes;
  duration: Sizes;
}
