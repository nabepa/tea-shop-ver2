import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  typography: {
    padding: theme.spacing(2),
  },
}));

const PopupMessage = ({ text, isOpen, onClose }) => {
  const classes = useStyles();
  const id = isOpen ? 'simple-popover' : undefined;

  return isOpen ? (
    <Popover
      id={id}
      open={isOpen}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
    >
      <div className={classes.container}>
        <Typography className={classes.typography}>{text}</Typography>
        <Button aria-describedby={id} variant='text' onClick={onClose}>
          Close
        </Button>
      </div>
    </Popover>
  ) : (
    <></>
  );
};

export default PopupMessage;
