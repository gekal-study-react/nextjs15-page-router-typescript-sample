import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import {Loading} from "@/components/Loading";

interface RouteLoadingProps {
  children: React.ReactNode;
}

export const RouteLoading: React.FC<RouteLoadingProps> = ({children}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleRouterChangeStart = (url: string, {shallow}: { shallow: boolean }) => {
      console.log("route change start", url, {shallow}, router.asPath)
      if (url !== router.asPath) {
        setLoading(true);
      }
    };
    const handleRouterChangeComplete = (url: string, {shallow}: { shallow: boolean }) => {
      console.log("route change complete", url, {shallow})
      setLoading(false);
    };
    const handleRouterChangeError = (err: unknown, url: string, {shallow}: { shallow: boolean }) => {
      console.log("route change error", err, url, {shallow})
      setLoading(false);
    };
    const handleHashChangeStart = (url: string, {shallow}: { shallow: boolean }) => {
      console.log("hash change start", url, {shallow})
    };
    const handleBeforeHistoryChange = (url: string, {shallow}: { shallow: boolean }) => {
      console.log("before history change", url, {shallow})
    };
    const handleHashChangeComplete = (url: string, {shallow}: { shallow: boolean }) => {
      console.log("hash change complete", url, {shallow})
    };

    router.events.on('routeChangeStart', handleRouterChangeStart);
    router.events.on('routeChangeComplete', handleRouterChangeComplete);
    router.events.on('routeChangeError', handleRouterChangeError);
    router.events.on('beforeHistoryChange', handleBeforeHistoryChange);
    router.events.on('hashChangeStart', handleHashChangeStart);
    router.events.on('hashChangeComplete', handleHashChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouterChangeStart);
      router.events.off('routeChangeComplete', handleRouterChangeComplete);
      router.events.off('routeChangeError', handleRouterChangeError);
      router.events.off('beforeHistoryChange', handleBeforeHistoryChange);
      router.events.off('hashChangeStart', handleHashChangeStart);
      router.events.off('hashChangeComplete', handleHashChangeComplete);
    };
  }, [router.asPath, router.events]);

  if (loading) {
    return (<Loading/>)
  }

  return <>{children}</>;
};
