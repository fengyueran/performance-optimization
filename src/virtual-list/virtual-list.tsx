import React, { useState } from 'react';
import { flushSync } from 'react-dom';

interface ItemProps {
  index: number;
}
const Item: React.FC<ItemProps> = ({ index }) => {
  return (
    <div
      style={{
        backgroundColor: index % 2 === 0 ? '#eee3e3' : '#9bd09d',
        width: '100%',
        height: '100%',
      }}
    >
      {index}
    </div>
  );
};

interface Props {
  itemCount: number;
  itemHeight: number;
  containerHeight: number;
}

export const VirtualList: React.FC<Props> = (props) => {
  const { itemCount, itemHeight, containerHeight } = props;
  const contentHeight = itemHeight * itemCount; // 内容高度
  const [scrollTop, setScrollTop] = useState(0); // 滚动高度
  // 继续需要渲染的 item 索引有哪些
  let startIdx = Math.floor(scrollTop / itemHeight);
  let endIdx = Math.floor((scrollTop + containerHeight) / itemHeight);

  const items = [];
  for (let i = startIdx; i <= endIdx; i++) {
    items.push(
      <div style={{ height: itemHeight }} key={i}>
        <Item index={i} />
      </div>
    );
  }

  const top = itemHeight * startIdx; // 第一个渲染 item 到顶部距离
  return (
    <div
      style={{
        height: containerHeight,
        overflow: 'auto',
        background: '#9BBAE7',
      }}
      onScroll={(e) => {
        // // 处理渲染异步导致的白屏现象
        // // 改为同步更新，但可能会有性能问题，可以做 节流 + RAF 优化
        flushSync(() => {
          setScrollTop((e.target as HTMLElement).scrollTop);
        });
        // setScrollTop((e.target as HTMLElement).scrollTop);
      }}
    >
      <div style={{ height: contentHeight }}>
        <div style={{ height: top }}></div>
        {items}
      </div>
    </div>
  );
};
