import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  makeStyles,
  createTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useForm } from 'react-hook-form';
import { emailRegExp, passwordRegExp } from '../../util/regexp';
import PopupMessage from '../PopupMessage/PopupMessage';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.success.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
    color: theme.palette.error.dark,
  },
  link: {
    cursor: 'pointer',
  },
}));

const theme = createTheme({
  palette: {
    primary: green,
  },
});

const SigninPage = ({ onSignin }) => {
  const history = useHistory();
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errMessage, setErrMessage] = useState('');

  const setErr = (err) => {
    setErrMessage(err.toString());
  };

  const closePopup = () => {
    setErrMessage('');
  };

  const onSubmit = (data) => {
    const { email, password } = data;
    onSignin(email, password)
      .then(() => history.push('/'))
      .catch(setErr);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <form
            className={classes.form}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <TextField
              id='email'
              name='email'
              variant='outlined'
              label='Email Address'
              autoComplete='email'
              margin='normal'
              fullWidth
              required
              autoFocus
              {...register('email', {
                required: 'This field is required.',
                pattern: {
                  value: emailRegExp,
                  message: 'Please write your email.',
                },
              })}
            />
            <Typography
              className={classes.alert}
              component='p'
              variant='caption'
            >
              {errors.email?.message}
            </Typography>
            <TextField
              id='password'
              name='password'
              variant='outlined'
              label='Password'
              autoComplete='current-password'
              margin='normal'
              type='password'
              fullWidth
              required
              {...register('password', {
                required: 'This field is required.',
                pattern: {
                  value: passwordRegExp,
                  message:
                    'Password should be at least 6 and no more than 14 characters.',
                },
              })}
            />
            <Typography
              component='p'
              variant='caption'
              className={classes.alert}
            >
              {errors.password?.message}
            </Typography>
            <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
            >
              Sign In
            </Button>
            <PopupMessage
              text={errMessage}
              isOpen={!!errMessage}
              onClose={closePopup}
            />
            <Grid container justifyContent='flex-end'>
              {/* Todo: Implement below */}
              {/* <Grid item xs>
              <Link variant='body2'>
                Forgot password?
              </Link>
            </Grid> */}
              <Grid item>
                <Link
                  className={classes.link}
                  variant='body2'
                  onClick={() => {
                    history.push('/register');
                  }}
                >
                  {"Don't have an account? Register."}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default SigninPage;
