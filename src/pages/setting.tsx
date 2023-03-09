import React, { Suspense } from 'react';

const Map = React.lazy(() => import('./profile'));

const Setting = () => {
  return (
    <Suspense fallback={<div>loading</div>}>
      <Map />
    </Suspense>
  );
};

export default Setting;
