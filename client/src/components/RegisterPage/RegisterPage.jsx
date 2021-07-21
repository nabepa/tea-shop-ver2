import React, { useRef } from 'react';
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
import { useForm } from 'react-hook-form';
import { emailRegExp, passwordRegExp } from '../../util/regexp';

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
  alert: {
    color: 'red',
  },
}));

const RegisterPage = (props) => {
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
  const onSubmit = (data) => console.log(data);

  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AssignmentIndOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          REGISTER
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
                })}
              />
              <p className={classes.alert}>{errors.firstName?.message}</p>
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
                })}
              />
              <p className={classes.alert}>{errors.firstName?.message}</p>
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
              <p className={classes.alert}>{errors.email?.message}</p>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id='password'
                name='password'
                variant='outlined'
                label='Password'
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
              <p className={classes.alert}>{errors.password?.message}</p>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id='rePassword'
                name='rePassword'
                variant='outlined'
                label='Re-enter Password'
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
                <p className={classes.alert}>The password do not match.</p>
              )}
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
