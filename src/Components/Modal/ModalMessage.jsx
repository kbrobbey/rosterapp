import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import PropTypes from 'prop-types';

export default function ModalMessage({ message, close, open }) {
  const handleClose = () => {
    close();
  };

  return (
    <div>
      <Dialog open={open} keepMounted onClose={handleClose}>
        <DialogTitle>Attention</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

ModalMessage.propTypes = {
  close: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired
};
