import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { greenTheme } from '../../style/myTheme';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { useForm } from 'react-hook-form';
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
  alert: {
    color: theme.palette.error.dark,
  },
}));

const categories = [
  { value: 'green', label: 'GREEN TEA' },
  { value: 'rooibos', label: 'ROOIBOS TEA' },
  { value: 'herbal', label: 'HERBAL TEA' },
];

const UploaderPage = ({ ImageAdd, productService, user }) => {
  const history = useHistory();
  const classes = useStyles();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errMessage, setErrMessage] = useState('');
  const [file, setFile] = useState({ fileName: null, fileURL: null });

  const setErr = (err) => {
    setErrMessage(err.message || 'Something went wrong!');
  };

  const closePopup = () => {
    setErrMessage('');
  };

  const changeFile = (file) => {
    setFile(file);
  };

  const onSubmit = async (data) => {
    const { category, name, price, stock, description } = data;
    productService
      .postProduct(category, name, price, stock, description)
      .then(() => {
        alert('success!');
        history.push('/');
      })
      .catch(setErr);
  };

  if (!user) {
    history.push('/signin');
  } else {
    user.role || history.goBack();
  }

  return (
    <ThemeProvider theme={greenTheme}>
      <Container component='main' maxWidth='md'>
        <Grid container spacing={3}>
          <Grid
            item
            container
            xs={12}
            sm={6}
            justifyContent='center'
            alignItems='center'
          >
            <ImageAdd url={file.fileURL} changeFile={changeFile} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <CloudUploadIcon />
              </Avatar>
              <Typography component='h1' variant='h5'>
                Upload New Product
              </Typography>
              <form
                className={classes.form}
                onSubmit={handleSubmit(onSubmit)}
                noValidate
              >
                <TextField
                  id='name'
                  name='name'
                  variant='outlined'
                  label='Product Name'
                  margin='normal'
                  fullWidth
                  required
                  autoFocus
                  {...register('name', {
                    required: 'This field is required.',
                  })}
                />
                <Typography
                  className={classes.alert}
                  component='p'
                  variant='caption'
                >
                  {errors.name?.message}
                </Typography>
                <TextField
                  id='category'
                  name='category'
                  variant='outlined'
                  label='Category'
                  margin='normal'
                  defaultValue=''
                  select
                  fullWidth
                  required
                  {...register('category', {
                    required: 'This field is required.',
                  })}
                >
                  {categories.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <Typography
                  className={classes.alert}
                  component='p'
                  variant='caption'
                >
                  {errors.category?.message}
                </Typography>
                <TextField
                  id='price'
                  name='price'
                  variant='outlined'
                  label='Price [$]'
                  margin='normal'
                  type='number'
                  inputProps={{ min: 0.99 }}
                  fullWidth
                  required
                  {...register('price', {
                    required: 'This field is required.',
                    min: {
                      value: 0.99,
                      message: 'Price should be at least $0.99',
                    },
                  })}
                />
                <Typography
                  className={classes.alert}
                  component='p'
                  variant='caption'
                >
                  {errors.price?.message}
                </Typography>
                <TextField
                  id='stock'
                  name='stock'
                  variant='outlined'
                  label='Stock [g]'
                  margin='normal'
                  type='number'
                  inputProps={{ min: 0, step: 500 }}
                  fullWidth
                  required
                  {...register('stock', {
                    required: true,
                    validate: (value) => {
                      const stock = parseInt(value);
                      if (stock < 0 || stock % 500 !== 0) return false;
                      else return true;
                    },
                  })}
                />
                {errors.stock && (
                  <Typography
                    className={classes.alert}
                    component='p'
                    variant='caption'
                  >
                    Please enter in 500g increments.
                  </Typography>
                )}
                <TextField
                  id='description'
                  name='description'
                  variant='outlined'
                  label='Description'
                  margin='normal'
                  multiline
                  fullWidth
                  required
                  {...register('description', {
                    required: 'This field is required.',
                  })}
                />
                <Typography
                  className={classes.alert}
                  component='p'
                  variant='caption'
                >
                  {errors.description?.message}
                </Typography>
                <Button
                  className={classes.submit}
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                >
                  upload
                </Button>
                <PopupMessage
                  text={errMessage}
                  isOpen={!!errMessage}
                  onClose={closePopup}
                />
              </form>
            </div>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default UploaderPage;
