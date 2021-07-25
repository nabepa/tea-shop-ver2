import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { greenTheme } from '../../style/myTheme';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useForm } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  test: {
    marginTop: '1.2em',
  },
  productName: {
    textTransform: 'uppercase',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  buttons: {
    marginTop: '1em',
  },
  button: {
    margin: '0 0.2em',
  },
  alert: {
    color: theme.palette.error.dark,
  },
}));

const DetailPage = ({ productService }) => {
  const classes = useStyles();
  const { id } = useParams();
  const [product, setProduct] = useState(undefined);
  const [charge, setCharge] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      const loaded = await productService.getProduct(id);
      setProduct(loaded);
    };
    fetchData();
  }, [id, productService]);

  const calcCharge = (amount) => {
    const amountNum = parseInt(amount);
    if (amountNum === 0) {
      setCharge(0);
    } else if (!amountNum || amountNum < 0 || amountNum % 500 !== 0) {
      return;
    } else {
      setCharge((amountNum / 500) * product.price);
    }
  };

  const onSubmit = (data) => {};

  return (
    <ThemeProvider theme={greenTheme}>
      <Container component='main' maxWidth='md'>
        {product && (
          <Grid container>
            <Grid
              className={classes.test}
              item
              xs={12}
              sm={6}
              container
              justifyContent='center'
            >
              <img src={product.image} width='80%' alt={product.name} />
            </Grid>
            <Grid
              className={classes.test}
              item
              xs={12}
              sm={6}
              container
              direction='column'
              justifyContent='center'
            >
              <Container>
                <Typography
                  className={classes.productName}
                  component='h1'
                  variant='h6'
                >
                  {product.name}
                </Typography>
                <Typography component='p' variant='body1'>
                  {product.description}
                </Typography>
                <Typography component='p' variant='body1'>
                  Price: $ {product.price} / 500g
                </Typography>
                <form
                  className={classes.form}
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                >
                  <TextField
                    id='amount'
                    name='amount'
                    variant='outlined'
                    label='Amount [g]'
                    margin='normal'
                    type='number'
                    inputProps={{ min: 0, step: 500 }}
                    required
                    {...register('amount', {
                      required: true,
                      validate: (value) => {
                        const amount = parseInt(value);
                        if (amount < 0 || amount % 500 !== 0) return false;
                        else return true;
                      },
                    })}
                    onChange={(event) => {
                      calcCharge(event.target.value);
                    }}
                  />
                  {errors.amount && (
                    <Typography
                      className={classes.alert}
                      component='p'
                      variant='caption'
                    >
                      Please enter in 500g increments.
                    </Typography>
                  )}
                  <Typography>${charge}</Typography>
                  <Grid className={classes.buttons}>
                    <Button
                      className={classes.button}
                      type='submit'
                      variant='outlined'
                      color='primary'
                    >
                      add to cart
                    </Button>
                    <Button
                      className={classes.button}
                      type='submit'
                      variant='outlined'
                      color='primary'
                    >
                      purchase
                    </Button>
                  </Grid>
                </form>
              </Container>
            </Grid>
          </Grid>
        )}
        {!product && <CircularProgress size='4rem' />}
      </Container>
    </ThemeProvider>
  );
};

export default DetailPage;
