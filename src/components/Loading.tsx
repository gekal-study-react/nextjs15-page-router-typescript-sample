import React from 'react';
import {Backdrop, CircularProgress} from '@mui/material';

export const Loading: React.FC = () => <Backdrop
  sx={{
    color: '#fff',
    zIndex: (theme) => theme.zIndex.drawer + 1,
    flexDirection: 'column',
    gap: 2,
  }}
  open={true}
>
  <CircularProgress color="inherit"/>
</Backdrop>