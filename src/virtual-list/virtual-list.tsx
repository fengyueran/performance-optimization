import React, { useState } from 'react';
import { flushSync } from 'react-dom';

type ComponentType<P = any> =
  | React.ComponentClass<P>
  | React.FunctionComponent<P>;
interface Props {
  itemCount: number;
  itemHeight: number;
  containerHeight: number;
  children: ComponentType;
}

export const VirtualList: React.FC<Props> = (props) => {
  const { itemCount, itemHeight, containerHeight, children } = props;

  const [scrollTop, setScrollTop] = useState(0); // 滚动高度

  const getItemRange = (scrollTopValue: number) => {
    //计算占满containerHeight需要渲染的 item 索引
    let startIdx = Math.floor(scrollTopValue / itemHeight);
    let endIdx = Math.floor((scrollTopValue + containerHeight) / itemHeight);

    startIdx = Math.max(startIdx, 0); // 处理越界情况
    endIdx = Math.min(endIdx, itemCount - 1);
    return [startIdx, endIdx];
  };

  const [startIdx, endIdx] = getItemRange(scrollTop);

  const top = itemHeight * startIdx; // 第一个渲染 item 到顶部距离
  const contentHeight = itemHeight * itemCount; // 内容高度

  const renderItems = () => {
    const Item = children;
    const items = [];
    for (let i = startIdx; i <= endIdx; i++) {
      items.push(
        <div style={{ height: itemHeight }} key={i}>
          <Item index={i} />
        </div>
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
        {/* 占位元素 */}
        <div style={{ height: top }} />
        {renderItems()}
      </div>
    </div>
  );
};
