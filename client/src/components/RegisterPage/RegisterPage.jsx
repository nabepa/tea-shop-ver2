import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: 'green',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const RegisterPage = (props) => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AssignmentIndOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          REGISTER
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                id='firstName'
                name='firstName'
                variant='outlined'
                label='First Name'
                autoComplete='fname'
                fullWidth
                required
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id='lastName'
                name='lastName'
                variant='outlined'
                label='Last Name'
                autoComplete='lname'
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id='email'
                name='email'
                variant='outlined'
                label='Email Address'
                autoComplete='email'
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id='password'
                name='password'
                variant='outlined'
                label='Password'
                autoComplete='current-password'
                type='password'
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Register
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Link
                onClick={() => {
                  history.push('/signin');
                }}
                variant='body2'
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default RegisterPage;
