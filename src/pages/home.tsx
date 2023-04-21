import React from 'react';
import { faker } from '@faker-js/faker';
import { VirtualList, VariableSizeList } from '../virtual-list';

interface ItemProps {
  index: number;
  data?: any;
}
const Item: React.FC<ItemProps> = ({ index, data }) => {
  return (
    <div
      style={{
        backgroundColor: index % 2 === 0 ? '#eee3e3' : '#9bd09d',
        width: '100%',
        height: '100%',
      }}
    >
      {data && data}
      {index}
    </div>
  );
};

const Home = () => {
  const list = new Array(1000).fill(0).map(() => faker.lorem.paragraph());
  return (
    <div style={{ padding: '100px 0 0 500px', overflow: 'hidden', width: 400 }}>
      {/* <VirtualList
        containerHeight={500}
        itemHeight={50}
        itemCount={list.length}
      >
        {({ index }) => <Item index={index} />}
      </VirtualList> */}
      <VariableSizeList containerHeight={500} itemData={list}>
        {({ index }) => <Item index={index} data={list[index]} />}
      </VariableSizeList>
    </div>
  );
};

export default Home;
