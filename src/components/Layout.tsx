import React, {Suspense} from 'react';
import {Container, AppBar, Toolbar, Typography, Box, CircularProgress} from '@mui/material';
import {ErrorBoundary} from 'react-error-boundary';
import {ErrorFallback} from './ErrorFallback';
import {useQueryErrorResetBoundary} from '@tanstack/react-query';
import {useRouter} from 'next/router';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({children}) => {
  const {reset} = useQueryErrorResetBoundary();
  const router = useRouter();

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{cursor: 'pointer'}}
            onClick={() => router.push('/')}
          >
            TODO アプリ
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{mt: 4}}>
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
          <Suspense
            fallback={
              <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress/>
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
