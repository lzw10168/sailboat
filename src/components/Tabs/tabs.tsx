import classNames from 'classnames';
import React, { useState, createContext, useRef, useEffect } from 'react';
import ActiveBar, { activeBarDisplayName } from './activeBar';
import { tabDisplayName, ITabProps } from './tab';
type onChangeCallback = (value: number) => void;
type Mode = 'vertical' | 'horizontal';
interface ITabsProps {
  children: React.ReactNode;
  value?: number;
  onChange?: onChangeCallback;
  className?: string;
  style?: React.CSSProperties;
  mode?: Mode;
}
interface ITabstext {
  onChange: onChangeCallback;
  activeIndex: number;
  tabsDom: HTMLElement | null;
  forceRenderCallback: () => void;
  mode: Mode;
}
export const TabsContext = createContext<ITabstext>({
  onChange: () => {},
  activeIndex: 0,
  tabsDom: null,
  forceRenderCallback: () => {},
  mode: 'horizontal'
});
const Tabs = (props: ITabsProps) => {
  const { children, value, onChange, className, style, mode } = props;
  const [activeIndex, setActiveIndex] = useState(value || 0);
  const [forceRenderState, setForceRenderState] = useState(0);
  const tabsRef = useRef(null);
  const [refState, setRefState] = useState(null);
  const classes = classNames('sail-tabs', className, {
    [`sail-tabs_${mode}`]: mode !== 'horizontal'
  });
  const handleChange = (index: number) => {
    setActiveIndex(index);
    if (onChange) {
      onChange(index);
    }
  };
  let passedContext: ITabstext = {
    onChange: handleChange,
    activeIndex: activeIndex,
    tabsDom: tabsRef.current,
    mode: mode as Mode,
    forceRenderCallback: () => {
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
          <ActiveBar forceRenderState={forceRenderState} />
        </>
      </TabsContext.Provider>
    </ul>
  );
};

Tabs.defaultProps = {
  mode: 'horizontal'
};
export default Tabs;
