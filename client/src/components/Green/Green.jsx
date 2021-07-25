import React from 'react';
import PageBanner from '../PageBanner/PageBanner';

const bannerInfo = {
  url: 'https://res.cloudinary.com/dukjzo7tf/image/upload/v1625378936/tea-shop/wallpaper/wallpaper-green.png',
  title: 'GREEN TEA',
  subtitle: `Several varieties of green tea exist, which differ substantially based on the variety of C. sinensis used, growing conditions, horticultural methods, production processing, and time of harvest.`,
};

const Green = (props) => {
  return (
    <>
      <PageBanner
        url={bannerInfo.url}
        title={bannerInfo.title}
        subtitle={bannerInfo.subtitle}
      />
      {/* <ProductCard /> */}
    </>
  );
};

export default Green;
