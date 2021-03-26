import { JSX } from '@ionic/core';
import { IonCol } from '@ionic/react';

export const Col: React.FC<ColProps> = ({ sizes, size, sizeXs, sizeSm, sizeMd, sizeLg, sizeXl, ...props }) => {

  const actualSizes = {
    default: sizes?.default?.toString() || size,
    xs: sizes?.xs?.toString() || sizeXs,
    sm: sizes?.sm?.toString() || sizeSm,
    md: sizes?.md?.toString() || sizeMd,
    lg: sizes?.lg?.toString() || sizeLg,
    xl: sizes?.xl?.toString() || sizeXl,
  }

  return (
    <IonCol
      {...props}
      size={actualSizes.default}
      sizeXs={actualSizes.xs}
      sizeSm={actualSizes.sm}
      sizeMd={actualSizes.md}
      sizeLg={actualSizes.lg}
      sizeXl={actualSizes.xl}
    />
  );
}

export interface Sizes {
  default?: string | number | undefined;
  xs?: string | number | undefined;
  sm?: string | number | undefined;
  md?: string | number | undefined;
  lg?: string | number | undefined;
  xl?: string | number | undefined;
}

export interface ColProps extends JSX.IonCol  {
  sizes?: Sizes | undefined;
  className?: string | undefined;
}
