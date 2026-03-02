import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { FallbackProps } from 'react-error-boundary';

export const ErrorFallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="50vh"
    >
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center', maxWidth: 400 }}>
        <Typography variant="h5" color="error" gutterBottom>
          問題が発生しました
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {error instanceof Error ? error.message : '予期しないエラーが発生しました。'}
        </Typography>
        <Button variant="contained" color="primary" onClick={resetErrorBoundary}>
          再試行
        </Button>
      </Paper>
    </Box>
  );
};
