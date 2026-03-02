import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {useRouter} from 'next/router';
import {useState, useEffect} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ThemeProvider, createTheme, Box, CircularProgress} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import {Layout} from '@/components/Layout';

const theme = createTheme();

export default function App({Component, pageProps}: AppProps) {
  const [mounted, setMounted] = useState(false);
  const [isRouteChanging, setIsRouteChanging] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);

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

  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  }));

  if (!mounted) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Layout>
          {isRouteChanging ? (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
              <CircularProgress/>
            </Box>
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
