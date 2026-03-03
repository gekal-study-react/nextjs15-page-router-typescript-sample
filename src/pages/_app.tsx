import "@/styles/globals.css";
import type {AppProps} from "next/app";
import {useEffect} from 'react';
import {createTheme, ThemeProvider} from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import {AppProvider} from '@/components/AppProvider';
import {QueryProvider} from '@/components/QueryProvider';
import {RouteLoading} from '@/components/RouteLoading';
import {useState} from 'react';

const theme = createTheme();

export default function App({Component, pageProps}: AppProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <QueryProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <AppProvider>
          <RouteLoading>
            <Component {...pageProps} />
          </RouteLoading>
        </AppProvider>
      </ThemeProvider>
    </QueryProvider>
  );
}
