import React from 'react';
import { faker } from '@faker-js/faker';
import { VirtualList, VariableSizeList } from '../virtual-list';

const Home = () => {
  const list = new Array(1000).fill(0).map(() => faker.lorem.paragraph());
  return (
    <div style={{ padding: '100px 0 0 500px', overflow: 'hidden', width: 400 }}>
      <VirtualList
        containerHeight={500}
        itemHeight={50}
        itemCount={list.length}
      />
      {/* <VariableSizeList containerHeight={500} itemData={list} /> */}
    </div>
  );
};

export default Home;
