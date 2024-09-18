import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#333', color: '#fff', padding: 2, textAlign: 'center' }}>
      <Typography variant="body2">
        © 2024 Company Name. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
