import React from 'react';
import { VirtualList } from '../virtual-list';

const Home = () => {
  const list = new Array(10000).fill(0).map((item, i) => i);
  return (
    <div style={{ padding: '100px', overflow: 'hidden' }}>
      <VirtualList
        containerHeight={500}
        itemHeight={50}
        itemCount={list.length}
      />
    </div>
  );
};

export default Home;
