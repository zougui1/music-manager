import { Typography, Grid } from '@material-ui/core';

import './LoadingToast.css';
import { CircularProgressWithLabel } from '../CircularProgressWithLabel';

export const LoadingToast: React.FC<LoadingToastProps> = ({ label, percent }) => {
  const withPercentage = typeof percent === 'number' && percent >= 0 && percent <= 100;
  const progressVariant = withPercentage ? 'determinate' : 'indeterminate';
  const percentage = Math.round(Number(percent));
  const percentageLabel = withPercentage ? `${percentage}%` : undefined;

  return (
    <Grid container className="loading-toast">
      <Grid item xs={3} className="spinner-col">
        <CircularProgressWithLabel
          color="secondary"
          variant={progressVariant}
          value={percentage}
          label={percentageLabel}
        />
      </Grid>

      <Grid item xs={9} className="label-col">
        {label && (
          <Typography>
            {label}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}

export interface LoadingToastProps {
  label?: React.ReactChild | undefined;
  percent?: number | undefined | null;
}
