import React from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert/Alert';

interface Props {
  open: boolean;
  message: string;
  duration?: number;
  onClose: (event?: React.SyntheticEvent, reason?: string) => void;
}

export default function SnackbarNotification({
  open,
  message,
  duration = 3000,
  onClose,
}: Props) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert severity="info">{message}</Alert>
    </Snackbar>
  );
}
