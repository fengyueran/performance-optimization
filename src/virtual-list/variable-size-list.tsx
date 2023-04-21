import React, { useState, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';

type ComponentType<P = any> =
  | React.ComponentClass<P>
  | React.FunctionComponent<P>;

interface ItemProps {
  index: number;
  children: ComponentType;
  onHeighReceived: (index: number, height: number) => void;
}
const ItemWrapper: React.FC<ItemProps> = (props) => {
  const { index, onHeighReceived, children } = props;
  const itemRef = useRef<any>();
  useEffect(() => {
    onHeighReceived(index, itemRef.current.getBoundingClientRect().height);
  }, [onHeighReceived, index]);

  const Item = children;
  return (
    <div ref={itemRef}>
      <Item index={index} />
    </div>
  );
};

interface Props {
  itemData: any[];
  containerHeight: number;
  children: ComponentType;
}

export const VariableSizeList: React.FC<Props> = (props) => {
  const { itemData, containerHeight, children } = props;
  const itemCount = itemData.length;

  const [scrollTop, setScrollTop] = useState(0); // 滚动高度

  const heightsRef = useRef([0]);

  // 预估高度
  const estimatedItemHeight = 40;

  const getHeight = (index: number) => {
    return heightsRef.current[index] ?? estimatedItemHeight;
  };

  const calcOffsets = () => {
    const offsets = [];
    offsets[0] = getHeight(0);
    for (let i = 1; i < itemCount; i++) {
      offsets[i] = getHeight(i) + offsets[i - 1];
    }
    return offsets;
  };

  const onHeighReceived = (index: number, height: number) => {
    if (heightsRef.current[index] !== height) {
      heightsRef.current[index] = height;
      setOffsets(calcOffsets());
    }
  };

  // 所有 items 的位置
  const [offsets, setOffsets] = useState(() => {
    return calcOffsets();
  });

  const getItemRange = (scrollTopValue: number) => {
    //计算占满containerHeight需要渲染的 item 索引
    let startIdx = offsets.findIndex((pos) => pos > scrollTopValue);
    let endIdx = offsets.findIndex(
      (pos) => pos > scrollTopValue + containerHeight
    );
    if (endIdx === -1) endIdx = itemCount;
    // 处理越界情况
    startIdx = Math.max(startIdx, 0);
    endIdx = Math.min(endIdx, itemCount - 1);
    return [startIdx, endIdx];
  };

  const [startIdx, endIdx] = getItemRange(scrollTop);
  const top = offsets[startIdx] - getHeight(startIdx); // 第一个渲染 item 到顶部距离
  const contentHeight = offsets[offsets.length - 1];

  const renderItems = () => {
    const items = [];
    for (let i = startIdx; i <= endIdx; i++) {
      items.push(
        <ItemWrapper key={i} index={i} onHeighReceived={onHeighReceived}>
          {children}
        </ItemWrapper>
      );
    }
    return items;
  };

  const onScroll: React.UIEventHandler<HTMLDivElement> = (e) => {
    const scrollTop = (e.target as HTMLElement).scrollTop;
    const range = getItemRange(scrollTop);
    if (startIdx !== range[0] || endIdx !== range[1]) {
      // setState异步更新会导致白屏问题, 因此改为同步更新
      // setScrollTop(scrollTop);
      flushSync(() => {
        setScrollTop(scrollTop);
      });
    }
  };

  return (
    <div
      style={{
        height: containerHeight,
        overflow: 'auto',
        background: '#9BBAE7',
      }}
      onScroll={onScroll}
    >
      <div style={{ height: contentHeight }}>
        <div style={{ height: top }}></div>
        {renderItems()}
      </div>
    </div>
  );
};
