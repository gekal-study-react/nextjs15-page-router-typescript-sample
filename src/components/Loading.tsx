import React from 'react';
import {Backdrop, CircularProgress, Typography} from '@mui/material';

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
  <Typography variant="h6" component="div">
    処理中...
  </Typography>
</Backdrop>