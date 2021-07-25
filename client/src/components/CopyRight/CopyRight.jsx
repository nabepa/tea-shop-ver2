import { Typography, Box } from '@material-ui/core';
import React from 'react';

const CopyRight = () => (
  <Box mt={5}>
    <Typography variant='body2' color='textSecondary' align='center'>
      {`Copyright © Nabepa ${new Date().getFullYear()}.`}
    </Typography>
  </Box>
);

export default CopyRight;
