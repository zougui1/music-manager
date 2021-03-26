import { CircularProgress, Typography, Box, CircularProgressProps } from '@material-ui/core';

export const CircularProgressWithLabel: React.FC<CircularProgressWithLabelProps> = ({ label, ...props }) => {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" component="div" color="textSecondary">
          {label}
        </Typography>
      </Box>
    </Box>
  );
}

export interface CircularProgressWithLabelProps extends CircularProgressProps {
  label?: string | number | undefined;
}
