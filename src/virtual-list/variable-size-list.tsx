import React, { useState, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';

interface ItemProps {
  index: number;
  data: string;
  setHeight: (index: number, height: number) => void;
}
const Item: React.FC<ItemProps> = ({ index, data, setHeight }) => {
  const itemRef = useRef<any>();
  useEffect(() => {
    setHeight(index, itemRef.current.getBoundingClientRect().height);
  }, [setHeight, index]);

  return (
    <div
      ref={itemRef}
      style={{
        backgroundColor: index % 2 === 0 ? '#eee3e3' : '#9bd09d',
        width: '100%',
        height: '100%',
      }}
    >
      {data}
    </div>
  );
};

interface Props {
  itemData: any[];
  containerHeight: number;
}

export const VariableSizeList: React.FC<Props> = (props) => {
  const { itemData, containerHeight } = props;
  const itemCount = itemData.length;
  const [scrollTop, setScrollTop] = useState(0); // 滚动高度

  const heightsRef = useRef(new Array(100));
  // 预估高度
  const estimatedItemHeight = 40;

  const getHeight = (index: number) => {
    return heightsRef.current[index] ?? estimatedItemHeight;
  };

  const setHeight = (index: number, height: number) => {
    if (heightsRef.current[index] !== height) {
      heightsRef.current[index] = height;
      // 让 VariableSizeList 组件更新高度
      setOffsets(genOffsets());
    }
  };

  const genOffsets = () => {
    const a = [];
    a[0] = getHeight(0);
    for (let i = 1; i < itemCount; i++) {
      a[i] = getHeight(i) + a[i - 1];
    }
    return a;
  };

  // 所有 items 的位置
  const [offsets, setOffsets] = useState(() => {
    return genOffsets();
  });

  // 找 startIdx 和 endIdx
  // 这里用了普通的查找，更好的方式是二分查找
  let startIdx = offsets.findIndex((pos) => pos > scrollTop);
  let endIdx = offsets.findIndex((pos) => pos > scrollTop + containerHeight);
  if (endIdx === -1) endIdx = itemCount;

  const items = [];
  for (let i = startIdx; i <= endIdx; i++) {
    items.push(
      <div key={i}>
        <Item index={i} setHeight={setHeight} data={itemData[i]} />
      </div>
    );
  }

  const top = offsets[startIdx] - heightsRef.current[startIdx]; // 第一个渲染 item 到顶部距离

  const contentHeight = offsets[offsets.length - 1];

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
