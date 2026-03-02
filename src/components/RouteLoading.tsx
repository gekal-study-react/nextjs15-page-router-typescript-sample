import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {Loading} from "@/components/Loading";

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
      <Loading/>
    );
  }

  return <>{children}</>;
};
