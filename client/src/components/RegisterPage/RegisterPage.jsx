import React, { useEffect, useRef, useState } from 'react';
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
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { useForm } from 'react-hook-form';
import { emailRegExp, letterRegExp, passwordRegExp } from '../../util/regexp';
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: theme.palette.primary.contrastText,
  },
  alert: {
    color: theme.palette.error.dark,
  },
  link: {
    cursor: 'pointer',
    color: theme.palette.success.dark,
  },
}));

const theme = createTheme({
  palette: {
    primary: green,
  },
});

const RegisterPage = ({ user, onRegister }) => {
  const history = useHistory();
  const classes = useStyles();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const passwordRef = useRef();
  passwordRef.current = watch('password');
  const [errMessage, setErrMessage] = useState('');

  const setErr = (err) => {
    setErrMessage(err.toString());
  };

  const closePopup = () => {
    setErrMessage('');
  };

  const onSubmit = (data) => {
    const { firstName, lastName, email, password } = data;
    onRegister(firstName, lastName, email, password)
      .then(() => history.push('/'))
      .catch(setErr);
  };

  useEffect(() => {
    user && history.push('/');
  }, [user]);

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AssignmentIndOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Register our site
          </Typography>
          <form
            className={classes.form}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id='firstName'
                  name='firstName'
                  variant='outlined'
                  label='First Name'
                  autoComplete='given-name'
                  fullWidth
                  required
                  autoFocus
                  {...register('firstName', {
                    required: 'This field is required.',
                    pattern: {
                      value: letterRegExp,
                      message: 'Only alphabets is allowed.',
                    },
                  })}
                />
                <Typography
                  className={classes.alert}
                  component='p'
                  variant='caption'
                >
                  {errors.firstName?.message}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id='lastName'
                  name='lastName'
                  variant='outlined'
                  label='Last Name'
                  autoComplete='family-name'
                  fullWidth
                  required
                  {...register('lastName', {
                    required: 'This field is required.',
                    pattern: {
                      value: letterRegExp,
                      message: 'Only alphabets is allowed',
                    },
                  })}
                />
                <Typography
                  className={classes.alert}
                  component='p'
                  variant='caption'
                >
                  {errors.lastName?.message}
                </Typography>
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
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id='password'
                  name='password'
                  variant='outlined'
                  label='Password(6-14 characters)'
                  autoComplete='new-password'
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
                  className={classes.alert}
                  component='p'
                  variant='caption'
                >
                  {errors.password?.message}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id='rePassword'
                  name='rePassword'
                  variant='outlined'
                  label='Re-enter Password(6-14 characters)'
                  autoComplete='new-password'
                  type='password'
                  fullWidth
                  required
                  {...register('rePassword', {
                    required: true,
                    validate: (value) => value === passwordRef.current,
                  })}
                />
                {errors.rePassword && (
                  <Typography
                    className={classes.alert}
                    component='p'
                    variant='caption'
                  >
                    The password does not match.
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Button
              className={classes.submit}
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
            >
              Register
            </Button>
            <PopupMessage
              text={errMessage}
              isOpen={!!errMessage}
              onClose={closePopup}
            />
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link
                  className={classes.link}
                  variant='body2'
                  onClick={() => {
                    history.push('/signin');
                  }}
                >
                  Already have an account? Sign in.
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default RegisterPage;
