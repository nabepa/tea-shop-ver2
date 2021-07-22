import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  box: { textAlign: 'center', color: '#fff', borderRadius: '4px' },
  common: {
    backgroundColor: theme.palette.success.dark,
  },
  alert: {
    backgroundColor: theme.palette.error.dark,
  },
}));

const Banner = memo(({ text, isAlert }) => {
  const classes = useStyles();
  return (
    <Box
      className={`${classes.box} ${isAlert ? classes.alert : classes.common}`}
      my={1}
    >
      {text && <Typography variant='h5'>{text}</Typography>}
    </Box>
  );
});

export default Banner;
