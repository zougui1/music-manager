import {
  Dialog as MuiDialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
  ButtonProps,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { FormattedMessage } from 'react-intl';

import './Dialog.css';

export const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, onOk, ...props }) => {
  const { title, withActions, okButtonProps, cancelButtonProps, children } = props;

  return (
    <MuiDialog open={isOpen} onClose={onClose} className="dialog">
      <DialogTitle disableTypography>
        <Typography variant="h6">{title}</Typography>

        <IconButton
          aria-label="close"
          onClick={onClose}
          className="close-icon"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {children}
      </DialogContent>

      {(withActions ?? true) && (
        <DialogActions>
          {onClose && (
            <Button
              color="secondary"
              size="small"
              {...(cancelButtonProps ?? {})}
              onClick={onClose}
            >
              <FormattedMessage id="common.cancel" />
            </Button>
          )}

          {onOk && (
            <Button
              color="primary"
              size="small"
              {...(okButtonProps ?? {})}
              onClick={onOk}
            >
              {okButtonProps?.label ?? <FormattedMessage id="common.ok" />}
            </Button>
          )}
        </DialogActions>
      )}
    </MuiDialog>
  );
}

export interface DialogProps {
  isOpen: boolean;
  onClose?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void | undefined;
  onOk?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void | undefined;
  title: React.ReactChild;
  withActions?: boolean | undefined;
  okButtonProps?: (ButtonProps & { label?: React.ReactChild }) | undefined;
  cancelButtonProps?: ButtonProps | undefined;
}
