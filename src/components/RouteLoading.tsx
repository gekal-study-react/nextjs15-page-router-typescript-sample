import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import {Box, CircularProgress} from '@mui/material';

interface RouteLoadingProps {
  children: React.ReactNode;
}

export const RouteLoading: React.FC<RouteLoadingProps> = ({children}) => {
  const router = useRouter();
  const [isRouteChanging, setIsRouteChanging] = useState(false);

  useEffect(() => {
    const handleStart = (url: string, {shallow}: { shallow: boolean }) => {
      console.log("route change start: ", url, shallow);
      setIsRouteChanging(true);
    }
    const handleComplete = (url: string, {shallow}: { shallow: boolean }) => {
      console.log("route change complete: ", url, shallow);
      setIsRouteChanging(false);
    }
    const handleError = (err: Error & { cancelled?: boolean }, url: string, {shallow}: { shallow: boolean }) => {
      console.error("route change error: ", err, url, shallow);
      setIsRouteChanging(false);
    }

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleError);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleError);
    };
  }, [router]);

  if (isRouteChanging) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress/>
      </Box>
    );
  }

  return <>{children}</>;
};
