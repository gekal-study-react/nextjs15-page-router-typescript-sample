import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import {Box, CircularProgress} from '@mui/material';

interface RouteLoadingProps {
  children: React.ReactNode;
}

export const RouteLoading: React.FC<RouteLoadingProps> = ({children}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) => {
      if (url !== router.asPath) {
        setLoading(true);
      }
    };
    const handleComplete = () => setLoading(false);
    const handleError = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleError);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleError);
    };
  }, [router]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress/>
      </Box>
    );
  }

  return <>{children}</>;
};
