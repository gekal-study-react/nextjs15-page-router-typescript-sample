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
          Something went wrong
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {error instanceof Error ? error.message : 'An unexpected error occurred.'}
        </Typography>
        <Button variant="contained" color="primary" onClick={resetErrorBoundary}>
          Try Again
        </Button>
      </Paper>
    </Box>
  );
};
