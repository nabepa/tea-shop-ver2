import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import PageBanner from '../PageBanner/PageBanner';
import ProductCard from '../ProductCard/ProductCard';

const ProductPage = ({ category, bannerInfo, productService }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const loaded = await productService.getProducts(category);
      setProducts(loaded);
    };
    fetchData();
  }, [category, productService]);

  return (
    <>
      <PageBanner
        url={bannerInfo.url}
        title={bannerInfo.title}
        subtitle={bannerInfo.subtitle}
      />
      <Container>
        <Grid container spacing={3} style={{ marginTop: '1em' }}>
          {products.map((product) => (
            <Grid item xs={12} sm={4} md={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default ProductPage;
