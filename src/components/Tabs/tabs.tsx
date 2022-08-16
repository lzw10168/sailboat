import classNames from 'classnames';
import React, { useState, createContext, useRef, useEffect } from 'react';
import ActiveBar, { activeBarDisplayName } from './activeBar';
import { tabDisplayName, ITabProps } from './tab';
type onChangeCallback = (value: number) => void;
type Mode = 'vertical' | 'horizontal';
type type = 'card' | 'border';
export interface ITabsProps {
  children: React.ReactNode;
  value?: number;
  className?: string;
  style?: React.CSSProperties;
  // mode?: Mode;
  type?: type;
  onChange?: onChangeCallback;
}
export interface ITabsContext {
  onChange: onChangeCallback;
  activeIndex: number;
  tabsDom: HTMLElement | null;
  forceRenderCallback: () => void;
  mode: Mode;
}
export const TabsContext = createContext<ITabsContext>({} as ITabsContext);

/**
 * 使用选项卡，你可以轻松地浏览和切换不同的视图。
 * ### 引入方式
 * ~~~js
 * import { Tabs, Tab, TabPanel } from '@sailboat';
 * ~~~
 * * 对于在同一层次，并且息息相关的内容组，使用选项卡能够将它们分组并且在其之间切换。
 */
export const Tabs = (props: ITabsProps) => {
  const { children, value, onChange, className, style, type } = props;
  const [activeIndex, setActiveIndex] = useState(value || 0);
  const [forceRenderState, setForceRenderState] = useState(0);
  const tabsRef = useRef(null);
  const [refState, setRefState] = useState(null);
  const classes = classNames('sail-tabs', className, {
    // [`sail-tabs_${mode}`]: mode !== 'horizontal' && type !== 'card',
    ['sail-tabs_card']: type === 'card'
  });
  const handleChange = (index: number) => {
    setActiveIndex(index);
    if (onChange) {
      onChange(index);
    }
  };
  let passedContext: ITabsContext = {
    onChange: handleChange,
    activeIndex: activeIndex,
    tabsDom: tabsRef.current,
    mode: 'horizontal',
    forceRenderCallback: () => {
      if (type === 'card') {
        return;
      }
      setForceRenderState(forceRenderState + 1);
    }
  };
  useEffect(() => {
    if (!tabsRef.current) {
      return;
    }
    setRefState(tabsRef.current);
  }, [tabsRef.current]);

  // 克隆子元素, 添加index, 判断类型是否是
  const renderChildren = React.Children.map(children, (child, index) => {
    const childElement = child as React.FunctionComponentElement<ITabProps>;
    const displayName = childElement.type.displayName;
    if (
      displayName !== tabDisplayName &&
      displayName !== activeBarDisplayName
    ) {
      console.error('Warning: Menu has a child which is not a Tab component.');
      return null;
    }
    return React.cloneElement(
      child as React.FunctionComponentElement<ITabProps>,
      {
        index: index
      }
    );
  });
  return (
    <ul className={classes} style={style} ref={tabsRef}>
      <TabsContext.Provider value={passedContext}>
        <>
          {renderChildren}
          {type !== 'card' && <ActiveBar forceRenderState={forceRenderState} />}
        </>
      </TabsContext.Provider>
    </ul>
  );
};

Tabs.defaultProps = {
  mode: 'horizontal',
  type: 'border'
};
export default Tabs;
