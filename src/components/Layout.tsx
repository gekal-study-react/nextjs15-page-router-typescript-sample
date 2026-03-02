import React, {Suspense} from 'react';
import {Container, AppBar, Toolbar, Typography, Box, CircularProgress, Backdrop} from '@mui/material';
import {ErrorBoundary} from 'react-error-boundary';
import {ErrorFallback} from './ErrorFallback';
import {useQueryErrorResetBoundary, useIsMutating, useIsFetching} from '@tanstack/react-query';
import {useRouter} from 'next/router';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({children}) => {
  const {reset} = useQueryErrorResetBoundary();
  const router = useRouter();
  const isMutating = useIsMutating();
  const isFetching = useIsFetching();

  const [isRouteChanging, setIsRouteChanging] = React.useState(false);

  React.useEffect(() => {
    const handleStart = () => setIsRouteChanging(true);
    const handleComplete = () => setIsRouteChanging(false);
    const handleError = () => setIsRouteChanging(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleError);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleError);
    };
  }, [router]);

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
          <Suspense fallback={null}>
            {children}
          </Suspense>
        </ErrorBoundary>
      </Container>

      {/* 処理中のローディングオーバーレイ */}
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          flexDirection: 'column',
          gap: 2,
        }}
        open={isMutating > 0 || isFetching > 0 || isRouteChanging}
      >
        <CircularProgress color="inherit"/>
        <Typography variant="h6" component="div">
          処理中...
        </Typography>
      </Backdrop>
    </Box>
  );
};
