import { Sizes } from '../../components/Col';

export const colSizes: ColSizes = {
  form: {
    default: 5,
  }
};

export interface ColSizes {
  form: Sizes;
}

const rules = {
  username: {
    minLength: 3,
    maxLength: 50,
  },
  password: {
    minLength: 8,
    maxLength: 512,
  },
};
