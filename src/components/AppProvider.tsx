import React, {Suspense} from 'react';
import {AppBar, Box, Container, Toolbar, Typography} from '@mui/material';
import {ErrorBoundary} from 'react-error-boundary';
import {ErrorFallback} from './ErrorFallback';
import {useIsFetching, useIsMutating, useQueryErrorResetBoundary} from '@tanstack/react-query';
import {useRouter} from 'next/router';
import {Loading} from "@/components/Loading";

interface LayoutProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<LayoutProps> = ({children}) => {
  const {reset} = useQueryErrorResetBoundary();
  const router = useRouter();
  const isMutating = useIsMutating();
  const isFetching = useIsFetching();

  const isLoading = isMutating > 0 || isFetching > 0;

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
            fallback={null}
          >
            {children}
          </Suspense>
        </ErrorBoundary>
      </Container>
      {isLoading && <Loading/>}
    </Box>
  );
};
