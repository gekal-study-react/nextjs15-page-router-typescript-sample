import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {useEffect, useState} from 'react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {createTheme, ThemeProvider} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import {Layout} from '@/components/Layout';
import {RouteLoading} from '@/components/RouteLoading';

const theme = createTheme();

export default function App({Component, pageProps}: AppProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
        <RouteLoading>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </RouteLoading>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
