import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { greenTheme } from '../../style/myTheme';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 250,
    margin: '0 auto',
  },
  media: {
    height: 250,
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
  },
  productName: {
    textTransform: 'uppercase',
  },
});

const ProductCard = ({ product }) => {
  const classes = useStyles();
  const history = useHistory();

  const showDetail = () => {
    product && history.push(`/product/detail/${product.id}`);
  };

  return (
    <ThemeProvider theme={greenTheme}>
      <Card className={classes.root}>
        <CardActionArea onClick={showDetail}>
          <CardMedia
            className={classes.media}
            image={product && product.image}
          />
          <CardContent>
            <Typography
              className={classes.productName}
              gutterBottom
              variant='h5'
              component='h2'
            >
              {product && product.name}
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              $ {product && product.price} (500g)
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.actions}>
          <Button size='small' color='primary'>
            cart
          </Button>
          <Button size='small' color='primary'>
            purchase
          </Button>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
};

export default ProductCard;
