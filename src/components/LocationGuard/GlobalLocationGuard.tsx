import React, { useEffect } from 'react';
import { getLocation } from '@utils';

const GlobalLocationGuard = ({ children }: { children: React.ReactNode }) => {
  getLocation();

  useEffect(() => {
    const locationInterval = setInterval(() => {
    //   console.log('call');

      getLocation();
    }, 10000);

    return () => clearInterval(locationInterval);
  }, []);

  return <>{children}</>;
};

export default GlobalLocationGuard;
