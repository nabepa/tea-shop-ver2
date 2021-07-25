import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  banner: {
    backgroundSize: 'cover',
    backgroundPosition: 'bottom',
    minHeight: '11.5rem',
  },
  text: {
    color: '#fafafa',
  },
}));

const PageBanner = ({ url, title, subtitle }) => {
  const classes = useStyles();

  return (
    <Box
      className={classes.banner}
      style={{ backgroundImage: `url(${url})` }}
      py={5}
    >
      <Container>
        <Typography className={classes.text} component='h1' variant='h4'>
          {title}
        </Typography>
        <Typography className={classes.text} component='p' variant='subtitle1'>
          {subtitle}
        </Typography>
      </Container>
    </Box>
  );
};

export default PageBanner;
