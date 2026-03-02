import React, { Suspense } from 'react';
import { Container, AppBar, Toolbar, Typography, Box, CircularProgress } from '@mui/material';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './ErrorFallback';
import { useQueryErrorResetBoundary } from '@tanstack/react-query';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography variant="h6" component="div">
              TODO アプリ
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
          <Suspense
            fallback={
              <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
              </Box>
            }
          >
            {children}
          </Suspense>
        </ErrorBoundary>
      </Container>
    </Box>
  );
};
